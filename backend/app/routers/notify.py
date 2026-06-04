import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# Load environment variables
backend_dir = Path(__file__).resolve().parent.parent.parent
env_path = backend_dir / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

router = APIRouter(prefix="/notify", tags=["Notifications"])

class NotifyInput(BaseModel):
    task: str
    assigned_to: str
    deadline: str = None
    meeting_title: str = None

@router.post("", status_code=status.HTTP_200_OK)
async def send_slack_notification(input: NotifyInput):
    token = os.getenv("SLACK_BOT_TOKEN")
    channel = os.getenv("SLACK_CHANNEL_ID")

    if not token or not channel:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Slack credentials not configured"
        )

    try:
        client = WebClient(token=token)

        deadline_text = f" by *{input.deadline}*" if input.deadline else ""
        meeting_text = f" from meeting *{input.meeting_title}*" if input.meeting_title else ""

        message = (
            f"🔔 *Action Item Reminder*{meeting_text}\n\n"
            f"👤 *Assigned to:* {input.assigned_to}\n"
            f"📋 *Task:* {input.task}\n"
            f"⏰ *Deadline:*{deadline_text if input.deadline else ' Not specified'}\n\n"
            f"Please make sure this is completed on time! ✅"
        )

        response = client.chat_postMessage(
            channel=channel,
            text=message,
            mrkdwn=True
        )

        return {
            "success": True,
            "message": "Slack notification sent!",
            "channel": channel,
            "ts": response["ts"]
        }

    except SlackApiError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Slack API error: {e.response['error']}"
        )