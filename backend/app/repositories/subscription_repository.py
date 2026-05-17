from datetime import datetime

from app.db.models.subscription import (
    Subscription
)


def get_active_subscription(
    db,
    user_id
):

    subscription = (

        db.query(Subscription)

        .filter(
            Subscription.user_id == user_id,
            Subscription.status == "active"
        )

        .first()
    )

    if not subscription:
        return None

    # =================================
    # AUTO DOWNGRADE
    # =================================

    if (
        subscription.current_period_end
        and
        subscription.current_period_end
        < datetime.utcnow()
    ):

        subscription.status = "expired"

        subscription.plan = "free"

        db.commit()

        return None

    return subscription