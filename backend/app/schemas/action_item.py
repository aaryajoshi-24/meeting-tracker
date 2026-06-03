from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class ItemStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class ItemPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class ActionItemBase(BaseModel):
    task: str
    assigned_to: str
    deadline: datetime
    priority: ItemPriority = ItemPriority.MEDIUM
    status: ItemStatus = ItemStatus.PENDING

class ActionItemCreate(ActionItemBase):
    pass

class ActionItemUpdate(BaseModel):
    status: ItemStatus

class ActionItemResponse(ActionItemBase):
    id: str
    meeting_id: str
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        use_enum_values = True
