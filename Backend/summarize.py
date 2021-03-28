import os

import youtube_dl
from dotenv import load_dotenv
from google.cloud import speech
from google.cloud import storage
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.utils import get_stop_words
import time

LANGUAGE = "english"
SENTENCES_COUNT = 10
bucket_name = 'hoohacks2021'
print(bucket_name)
gs_uri_prefix = f"gs://{bucket_name}"
print(gs_uri_prefix)


def download_video(video_id):
    ydl_opts = {
        'outtmpl': '%(title)s.%(resolution)s.%(id)s.%(ext)s',
        'format':
            'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'flac',
            'preferredquality': '192'
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        uri = 'http://www.youtube.com/watch?v={0}'.format(video_id)
        ydl.download([uri])
        meta = ydl.extract_info(uri, download=False)
    return "{0}.{1}x{2}.{3}.{4}".format((meta['title']), (meta['id']),
                                            (meta['ext']))


def transcribe_file(input_language, mode, path, bucket_name):
    """Asynchronously transcribes the audio file specified."""

    if input_language == 'fr':
        language = 'fr-FR'
    else:
        language = 'en-US'

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        language_code="en-US",
        enable_word_time_offsets=True,
        model='video',
        audio_channel_count=2,
        enable_automatic_punctuation=True,
    )

    # file on GCS
    if mode == "gcs":
        audio = speech.RecognitionAudio(uri=f"{gs_uri_prefix}/{path}")
    # local file
    else:
        with open(path, "rb") as audio_file:
            content = audio_file.read()
        audio = speech.RecognitionAudio(content=content)

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=90)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    content = ""
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        print(u"Transcript: {}".format(result.alternatives[0].transcript))
        print("Confidence: {}".format(result.alternatives[0].confidence))
        content += result.alternatives[0].transcript
        content += "\n"

    return content


def upload_to_bucket(blob_name):
    storage_client = storage.Client.from_service_account_json(
        'config.json')

    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(blob_name)
    blob.upload_from_filename(blob_name)

    return blob.public_url


def get_summary(video_id: str):
    summary = ""
    load_dotenv()
    filename = download_video(video_id)
    filename = filename[:-5]
    bucket_audio = "{0}.flac".format(filename)
    upload_to_bucket(bucket_audio)
    script = transcribe_file("en", "gcs", bucket_audio, gs_uri_prefix)

    parser = PlaintextParser.from_string(script, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        summary = summary + str(sentence) + " "

    return [filename, summary]


if __name__ == "__main__":
    r = get_summary('Zv5Qa2kGL04')
    print(r[0])
    print(r[1])
