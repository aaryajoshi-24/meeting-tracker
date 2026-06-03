from fastapi import APIRouter, HTTPException, status
from app.services.supabase_client import supabase
from app.schemas.action_item import ActionItemCreate, ActionItemUpdate, ActionItemResponse

router = APIRouter(tags=["Action Items"])

@router.post("/meetings/{meeting_id}/items", response_model=ActionItemResponse, status_code=status.HTTP_201_CREATED)
async def create_action_item(meeting_id: str, item: ActionItemCreate):
    try:
        # Check if the associated meeting exists
        meeting_check = supabase.table("meetings").select("id").eq("id", meeting_id).execute()
        if not meeting_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Meeting with ID {meeting_id} not found"
            )

        data = item.model_dump()
        data["meeting_id"] = meeting_id
        data["deadline"] = data["deadline"].isoformat()

        response = supabase.table("action_items").insert(data).execute()
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create action item"
            )
        return response.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/meetings/{meeting_id}/items", response_model=list[ActionItemResponse])
async def get_action_items(meeting_id: str):
    try:
        # Check if the associated meeting exists
        meeting_check = supabase.table("meetings").select("id").eq("id", meeting_id).execute()
        if not meeting_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Meeting with ID {meeting_id} not found"
            )

        response = supabase.table("action_items").select("*").eq("meeting_id", meeting_id).execute()
        return response.data
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.patch("/items/{id}", response_model=ActionItemResponse)
async def update_action_item_status(id: str, update: ActionItemUpdate):
    try:
        # Check if the action item exists
        item_check = supabase.table("action_items").select("id").eq("id", id).execute()
        if not item_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Action item with ID {id} not found"
            )

        response = supabase.table("action_items").update({"status": update.status.value}).eq("id", id).execute()
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update action item status"
            )
        return response.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_action_item(id: str):
    try:
        # Check if the action item exists
        item_check = supabase.table("action_items").select("id").eq("id", id).execute()
        if not item_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Action item with ID {id} not found"
            )

        supabase.table("action_items").delete().eq("id", id).execute()
        return None
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
