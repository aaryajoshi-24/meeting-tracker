from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MeetingBase(BaseModel):
    title: str
    description: Optional[str] = None
    meeting_date: datetime

class MeetingCreate(MeetingBase):
    pass

class MeetingResponse(MeetingBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
