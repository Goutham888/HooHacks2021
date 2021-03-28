# -*- coding: utf-8 -*-

from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from youtube_transcript_api import YouTubeTranscriptApi
from punctuator import Punctuator


LANGUAGE = "english"
SENTENCES_COUNT = 10


def get_summary(video_id: str):
    script=""
    summary=""
    p = Punctuator('Demo-Europarl-EN.pcl')
    # retrieve the available transcripts
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

    transcript = transcript_list.find_transcript(['en'])

    phrases = transcript.fetch()
    for phrase in phrases:
            script=script+phrase['text']+" "

    if "." not in script:
        print("getting punctuated")
        script=p.punctuate(script)

    
    parser = PlaintextParser.from_string(script, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        summary=summary+str(sentence)+" "

    return summary

if __name__ == "__main__":
    print(get_summary('jm9YKT0dItk'))