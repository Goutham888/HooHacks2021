import youtube_dl


def download_video(video_id):
    ydl_opts = {
        'outtmpl': '%(title)s.%(resolution)s.%(id)s.%(ext)s',
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
        meta = ydl.extract_info(uri, download=False)
    return "{0}.{1}x{2}.{3}.{4}".format((meta['title']), (meta['width']), (meta['height']), (meta['id']),
                                            (meta['ext']))

        # info = ydl.extract_info(uri, download=True)
        # filename = ydl.prepare_filename(info)
        # print("name" + filename)


def get_name(video_id):
    ydl_opts = {
        'outtmpl': '%(title)s.%(resolution)s.%(id)s.%(ext)s',
        'format':
            'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192'
        }],
    }
    uri = 'http://www.youtube.com/watch?v={0}'.format(video_id)
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        meta = ydl.extract_info(uri, download=False)
    return "{0}.{1}x{2}.{3}.{4}".format((meta['title']), (meta['width']), (meta['height']), (meta['id']), (meta['ext']))


id = "Qru7QnTxw7c"
# download_video(id)

result = get_name(id)
print(result)
