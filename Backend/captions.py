from youtube_transcript_api import YouTubeTranscriptApi

# retrieve the available transcripts
transcript_list = YouTubeTranscriptApi.list_transcripts('Z-HvpKCMe5U')

script=""
# iterate over all available transcripts
for transcript in transcript_list:
    phrases = transcript.fetch()
    for phrase in phrases:
        script=script+phrase['text']+" "

print(script)