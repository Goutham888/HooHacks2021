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


LANGUAGE = "english"
SENTENCES_COUNT = 15


if __name__ == "__main__":
    script=""
    # retrieve the available transcripts
    transcript_list = YouTubeTranscriptApi.list_transcripts('SBqnRja4CW4')

    transcript = transcript_list.find_transcript(['en'])

    phrases = transcript.fetch()
    for phrase in phrases:
            script=script+phrase['text']+" "

    parser = PlaintextParser.from_string(script, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        print(sentence)