import os
from pathlib import Path
import tempfile
import shutil
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from groq import Groq

# Load environment variables from backend/.env
backend_dir = Path(__file__).resolve().parent.parent.parent
env_path = backend_dir / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

router = APIRouter(prefix="/transcribe", tags=["Transcription"])

@router.post("", status_code=status.HTTP_200_OK)
async def transcribe_audio(file: UploadFile = File(...)):
    if not groq_api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GROQ_API_KEY environment variable is not configured on the server."
        )

    # Validate file extension
    filename = file.filename
    if not filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file has no filename."
        )

    ext = filename.split(".")[-1].lower()
    supported_extensions = {"mp3", "mp4", "wav", "m4a"}
    
    if ext not in supported_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format: .{ext}. Supported formats are: {', '.join(supported_extensions)}"
        )

    # Initialize Groq client inside endpoint to ensure key check happens or globally
    # Initialize it globally or here. Doing it globally is cleaner, but doing it safely is also good.
    try:
        client = Groq(api_key=groq_api_key)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to initialize Groq client: {str(e)}"
        )

    # Write uploaded file contents to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as temp_file:
        shutil.copyfileobj(file.file, temp_file)
        temp_file_path = temp_file.name

    try:
        # Call Groq Whisper API
        with open(temp_file_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-large-v3",
                file=audio_file,
            )
        return {"transcript": transcription.text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Groq Whisper API transcription failed: {str(e)}"
        )
    finally:
        # Cleanup temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
