from fastapi import FastAPI
from . import summary_creator

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/summarize/{video_id}")
def get_video_summary(video_id: str):
    return summary_creator.get_summary(video_id)
