from fastapi import APIRouter, HTTPException, status
from app.services.supabase_client import supabase
from app.schemas.meeting import MeetingCreate, MeetingResponse

router = APIRouter(prefix="/meetings", tags=["Meetings"])

@router.post("", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
async def create_meeting(meeting: MeetingCreate):
    try:
        # Convert schema to dict and serialize datetime
        data = meeting.model_dump()
        data["meeting_date"] = data["meeting_date"].isoformat()
        
        response = supabase.table("meetings").insert(data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail="Failed to create meeting"
            )
        return response.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=str(e)
        )

@router.get("", response_model=list[MeetingResponse])
async def get_meetings():
    try:
        response = supabase.table("meetings").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=str(e)
        )

@router.get("/{id}", response_model=MeetingResponse)
async def get_meeting(id: str):
    try:
        response = supabase.table("meetings").select("*").eq("id", id).execute()
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Meeting not found"
            )
        return response.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=str(e)
        )

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_meeting(id: str):
    try:
        # Check if meeting exists
        check_response = supabase.table("meetings").select("id").eq("id", id).execute()
        if not check_response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Meeting not found"
            )
        
        supabase.table("meetings").delete().eq("id", id).execute()
        return None
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=str(e)
        )
