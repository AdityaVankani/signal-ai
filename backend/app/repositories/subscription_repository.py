from app.db.models.subscription import Subscription


def get_active_subscription(
    db,
    user_id
):

    return (
        db.query(Subscription)
        .filter(
            Subscription.user_id == user_id,
            Subscription.status == "active"
        )
        .first()
    )