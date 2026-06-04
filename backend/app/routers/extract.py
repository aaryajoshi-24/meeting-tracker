import os
import json
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from groq import Groq

# Load environment variables
backend_dir = Path(__file__).resolve().parent.parent.parent
env_path = backend_dir / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

router = APIRouter(prefix="/extract", tags=["AI Extraction"])

class TranscriptInput(BaseModel):
    transcript: str
    meeting_id: str = None

@router.post("", status_code=status.HTTP_200_OK)
async def extract_action_items(input: TranscriptInput):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GROQ_API_KEY not configured"
        )

    try:
        client = Groq(api_key=api_key)

        prompt = f"""You are an AI assistant that extracts action items from meeting transcripts.

From the following meeting transcript, extract ALL action items.
For each action item return:
- task: what needs to be done
- assigned_to: who is responsible
- deadline: when it should be done or null
- priority: high, medium, or low

Return ONLY a valid JSON array, no extra text:
[
  {{
    "task": "Complete the backend API",
    "assigned_to": "John",
    "deadline": "Friday",
    "priority": "high"
  }}
]

Meeting transcript:
{input.transcript}"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )

        content = response.choices[0].message.content.strip()

        # Clean markdown if present
        if "```" in content:
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]

        action_items = json.loads(content.strip())

        return {
            "meeting_id": input.meeting_id,
            "action_items": action_items,
            "count": len(action_items)
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI extraction failed: {str(e)}"
        )