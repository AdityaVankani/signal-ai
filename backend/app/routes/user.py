from datetime import datetime, timedelta

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.dependencies.auth import (
    get_current_user
)

from app.db.models.subscription import (
    Subscription
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


@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    subscription = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id
        )
        .first()
    )

    last_24_hours = (

        datetime.utcnow()

        - timedelta(days=30)

    )

    usage_count = (

        db.query(UsageLog)

        .filter(

            UsageLog.user_id == user_id,

            UsageLog.action ==

            "hosted_analyze_post",

            UsageLog.created_at >=

            last_24_hours

        )

        .count()

    )

    FREE_LIMIT = 5

    remaining_requests = max(

        0,

        FREE_LIMIT - usage_count

    )

    return {

        "email":

            current_user.email,

        "plan":

            subscription.plan

            if subscription

            else "free",

        "subscription_status":

            subscription.status

            if subscription

            else "inactive",

        "plan_expires":

            str(subscription.current_period_end)

            if subscription

            else None,

        "remaining_free_requests":

            remaining_requests

    }