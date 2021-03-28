import os

import youtube_dl
from pytube import YouTube
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.utils import get_stop_words
from google.cloud import speech

LANGUAGE = "english"
SENTENCES_COUNT = 10


def download_video(video_id):
    ydl_opts = {
        'format':
            'bestaudio/best',
        'outtmpl': "{0}.wav".format(video_id),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192'
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download(['http://www.youtube.com/watch?v={0}'.format(video_id)])


def transcribe_file(mode, path, bucket_name, punctuation):
    """Asynchronously transcribes the audio file specified."""

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        language_code="en-US",
        enable_automatic_punctuation=punctuation,
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
    # content_newlines = split_newlines(content)
    # filename = path.split('/')[-1]
    # save_transcript(filename, content_newlines)

    # return the content string, rather than make a file
    return content

def get_summary(video_id: str):
    download_video(video_id)

    script = ""
    summary = ""
    title = YouTube(video_id).title
    # # retrieve the available transcripts
    # transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
    #
    # transcript = transcript_list.find_transcript(['en'])
    #
    # phrases = transcript.fetch()
    # for phrase in phrases:
    #     script = script + phrase['text'] + " "
    bucket_name = os.getenv("BUCKET_NAME")
    gs_uri_prefix = f"gs://{bucket_name}"
    script = transcribe_file("gcs", "{0}.wav".format(video_id), gs_uri_prefix, True)

    parser = PlaintextParser.from_string(script, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        summary = summary + str(sentence) + " "

    return [title, summary]


if __name__ == "__main__":
    r = get_summary('2O18RbWmrYA')
    print(r[0])
    print(r[1])
