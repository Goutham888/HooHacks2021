from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

LANGUAGE = "english"
SENTENCES_COUNT = 10

if __name__ == "__main__":
    filename = "/Users/robertbao/Documents/GitHub/HooHacks2021/Backend/transcripts/Example - Amplitude and period _ Graphs of trig functions _ Trigonometry _ Khan Academy-SBqnRja4CW4.wav.txt"
    # or for plain text files
    parser = PlaintextParser.from_file(filename, Tokenizer(LANGUAGE))
    # parser = PlaintextParser.from_string("Check this out.", Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        print(sentence)