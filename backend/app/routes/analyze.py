from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException
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

from app.repositories.subscription_repository import (
    get_active_subscription
)

from app.repositories.analysis_repository import (
    save_analysis
)

from app.dependencies.auth import (
    get_current_user
)

from app.db.models.usage_log import (

    UsageLog

)

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# @router.post("/analyze-post")
# async def analyze_post(
#     data: PostRequest,
#     current_user=Depends(
#         get_current_user
#     ),
#     db: Session = Depends(get_db)
# ):
    
#     user_id = current_user.id

#     # =================================

#     # CHECK SUBSCRIPTION

#     # =================================

#     subscription = get_active_subscription(

#         db,

#         user_id

#     )

#     is_pro = subscription is not None

#     # =================================

#     # FREE PLAN LIMIT

#     # =================================

#     if not is_pro:

#         last_24_hours = (

#             datetime.utcnow()

#             - timedelta(days=30)

#         )

#         usage_count = (

#             db.query(UsageLog)

#             .filter(

#                 UsageLog.user_id == user_id,

#                 UsageLog.action ==

#                 "analyze_post",

#                 UsageLog.created_at >=

#                 last_24_hours

#             )

#             .count()

#         )

#         FREE_LIMIT = 5

#         if usage_count >= FREE_LIMIT:

#             raise HTTPException(

#                 status_code=403,

#                 detail=

#                     "Free limit reached. Upgrade to Pro."

#             )

#     result = analyze_post_with_ai(
#     post_text=data.post_text,
#     tone=data.tone,
#     mode=data.mode,
#     api_key=data.api_key,
#     model=data.model
# )

#     save_analysis(

#     db=db,

#     user_id=current_user.id,

#     post_text=data.post_text,

#     tone=data.tone,

#     result=result
# )
#     usage = UsageLog(

#         user_id=user_id,

#         action="analyze_post",

#         ip_address="extension"

#     )

#     db.add(usage)

#     db.commit()

#     return result

@router.post("/analyze-post")
async def analyze_post(
    data: PostRequest,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    user_id = current_user.id

    # =================================
    # CHECK SUBSCRIPTION
    # =================================

    subscription = get_active_subscription(
        db,
        user_id
    )

    is_pro = subscription is not None

    # =================================
    # HOSTED MODE ONLY
    # =================================

    if data.mode == "hosted":

        # =============================
        # FREE PLAN LIMIT
        # =============================

        if not is_pro:

            last_24_hours = (
                datetime.utcnow()
                - timedelta(days=30)
            )

            usage_count = (
                db.query(UsageLog)
                .filter(
                    UsageLog.user_id == user_id,
                    UsageLog.action == "hosted_analyze_post",
                    UsageLog.created_at >= last_24_hours
                )
                .count()
            )

            FREE_LIMIT = 5

            if usage_count >= FREE_LIMIT:

                raise HTTPException(
                    status_code=403,
                    detail=(
                        "Free limit reached. "
                        "Upgrade to Pro."
                    )
                )

    # =================================
    # AI ANALYSIS
    # =================================

    result = analyze_post_with_ai(
        post_text=data.post_text,
        tone=data.tone,
        mode=data.mode,
        api_key=data.api_key,
        model=data.model
    )

    # =================================
    # SAVE ANALYSIS
    # =================================

    save_analysis(
        db=db,
        user_id=user_id,
        post_text=data.post_text,
        tone=data.tone,
        result=result
    )

    # =================================
    # ONLY TRACK HOSTED USAGE
    # =================================

    if data.mode == "hosted":

        usage = UsageLog(
            user_id=user_id,
            action="hosted_analyze_post",
            ip_address="extension"
        )

        db.add(usage)

        db.commit()

    return result