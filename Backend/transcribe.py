import logging
import sys
import os
from dotenv import load_dotenv
from google.cloud import speech


def save_transcript(filename, content, directory="transcripts"):
    """Saves the transcript as a txt file."""

    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(f"{directory}/{filename}.txt", "w+",
              encoding="utf-8") as transcript_file:
        transcript_file.write(content)


def split_newlines(content, n=64):
    """Splits a string every n+m characters (with m the number of characters until there is a space) by adding a newline if there are no newlines in between"""

    count = 0
    content_newlines = ''

    for i in range(len(content)):
        if content[i] == '\n':
            count = 0
        if count == n:
            # Find next space to split
            if content[i] == ' ':
                content_newlines += '\n'
                count = 0
            else:
                content_newlines += content[i]
        else:
            count += 1
            content_newlines += content[i]

    return content_newlines


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


if __name__ == "__main__":

    load_dotenv()
    mode = sys.argv[1]
    audio_file_path = sys.argv[2]
    input_language = sys.argv[3]
    bucket_name = os.getenv("BUCKET_NAME")
    gs_uri_prefix = f"gs://{bucket_name}"

    transcribe_file(mode, audio_file_path, gs_uri_prefix, True)
