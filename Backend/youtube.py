import youtube_dl

id = "2O18RbWmrYA"


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
