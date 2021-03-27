from youtube_transcript_api import YouTubeTranscriptApi

script=""
# retrieve the available transcripts
transcript_list = YouTubeTranscriptApi.list_transcripts('SBqnRja4CW4')

transcript = transcript_list.find_transcript(['en'])

phrases = transcript.fetch()
for phrase in phrases:
        script=script+phrase['text']+" "

print(script)