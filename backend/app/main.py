from __future__ import annotations

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from backend.app.model import analyze_crop_image

app = FastAPI(title="AgriNova Crop Analysis API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/analyze")
async def analyze(image: UploadFile = File(...)) -> dict:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload a valid image file.")

    image_bytes = await image.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="The uploaded image is empty.")

    return analyze_crop_image(image_bytes, image.filename or "field-image.jpg")
