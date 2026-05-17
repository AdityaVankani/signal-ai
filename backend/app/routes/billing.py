from datetime import datetime
from datetime import timedelta

import stripe

from fastapi import APIRouter
from fastapi import Depends
from fastapi import Request
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.config import (
    STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID,
    STRIPE_WEBHOOK_SECRET
)

from app.dependencies.auth import (
    get_current_user
)

from app.db.database import (
    SessionLocal
)

from app.db.models.subscription import (
    Subscription
)

from app.db.models.usage_log import (
    UsageLog
)

stripe.api_key = STRIPE_SECRET_KEY

router = APIRouter()


# =====================================
# DB
# =====================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================
# CREATE CHECKOUT SESSION
# =====================================

@router.post("/create-checkout-session")
async def create_checkout_session(
    user=Depends(get_current_user)
):

    session = stripe.checkout.Session.create(

        payment_method_types=["card"],

        mode="subscription",

        line_items=[{
            "price": STRIPE_PRICE_ID,
            "quantity": 1
        }],

        success_url=
            "http://127.0.0.1:5500/frontend/success.html",

        cancel_url=
            "http://127.0.0.1:5500/frontend/cancel.html",

        customer_email=user.email,

        metadata={
            "user_id": user.id
        }
    )

    return {
        "checkout_url": session.url
    }


# =====================================
# STRIPE WEBHOOK
# =====================================

@router.post("/stripe-webhook")
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):

    payload = await request.body()

    sig_header = request.headers.get(
        "stripe-signature"
    )

    try:

        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            STRIPE_WEBHOOK_SECRET
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    # =================================
    # PAYMENT SUCCESS
    # =================================

    if event["type"] == "checkout.session.completed":

        session_data = event["data"]["object"]

        user_id = int(
            session_data["metadata"]["user_id"]
        )

        stripe_customer_id = (
            session_data["customer"]
        )

        stripe_subscription_id = (
            session_data["subscription"]
        )

        # =================================
        # SAFE PERIOD END FETCH
        # =================================

        try:

            stripe_subscription = (
                stripe.Subscription.retrieve(
                    stripe_subscription_id
                )
            )

            period_end_timestamp = (
                stripe_subscription.get(
                    "current_period_end"
                )
            )

            if period_end_timestamp:

                current_period_end = (
                    datetime.utcfromtimestamp(
                        period_end_timestamp
                    )
                )

            else:

                current_period_end = (
                    datetime.utcnow()
                    + timedelta(days=30)
                )

        except Exception:

            current_period_end = (
                datetime.utcnow()
                + timedelta(days=30)
            )

        # =================================
        # EXISTING SUBSCRIPTION
        # =================================

        existing = (
            db.query(Subscription)
            .filter(
                Subscription.user_id == user_id
            )
            .first()
        )

        if existing:

            existing.plan = "pro"

            existing.status = "active"

            existing.current_period_end = (
                current_period_end
            )

            existing.stripe_customer_id = (
                stripe_customer_id
            )

            existing.stripe_subscription_id = (
                stripe_subscription_id
            )

        else:

            subscription = Subscription(

                user_id=user_id,

                stripe_customer_id=
                    stripe_customer_id,

                stripe_subscription_id=
                    stripe_subscription_id,

                plan="pro",

                status="active",

                current_period_end=
                    current_period_end
            )

            db.add(subscription)

        # =================================
        # LOG USAGE
        # =================================

        usage = UsageLog(

            user_id=user_id,

            action="subscription_upgrade",

            ip_address="stripe_webhook"
        )

        db.add(usage)

        db.commit()

    return {
        "success": True
    }