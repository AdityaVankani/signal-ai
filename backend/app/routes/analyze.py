from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.models.post import (
    PostRequest
)

from app.services.ai_service import (
    analyze_post_with_ai
)

from app.db.database import (
    SessionLocal
)

from app.repositories.analysis_repository import (
    save_analysis
)

from app.dependencies.auth import (
    get_current_user
)

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/analyze-post")
async def analyze_post(
    data: PostRequest,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    result = analyze_post_with_ai(
        data
    )

    save_analysis(

    db=db,

    user_id=current_user["user_id"],

    post_text=data.post_text,

    tone=data.tone,

    result=result
)

    return result