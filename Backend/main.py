from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import summarize

app = FastAPI()

# enable origins from all of these routes
origins = [
    "http://localhost:8000", "http://localhost:3000", "http://localhost:****",
    "http://172.26.108.108/"
]

# enable cors so all origins are allowed
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summarize/{video_id}")
def get_video_summary(video_id: str):
    return summarize.get_summary(video_id)
