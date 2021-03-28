import youtube_dl

def download_video(video_id):
    ydl_opts = {
        'outtmpl': '%(id)s',
        'format':
            'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192'
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        uri = 'http://www.youtube.com/watch?v={0}'.format(video_id)
        ydl.download([uri])
        # info = ydl.extract_info(uri, download=True)
        # filename = ydl.prepare_filename(info)
        # print("name" + filename)

id = "Qru7QnTxw7c"
download_video(id)
