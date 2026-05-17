from datetime import datetime
from datetime import timedelta

import hmac
import hashlib
import json

import razorpay

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request
)

from sqlalchemy.orm import Session

from app.core.config import (
    FRONTEND_SUCCESS_URL,
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
    RAZORPAY_WEBHOOK_SECRET
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

router = APIRouter()

client = razorpay.Client(
    auth=(
        RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET
    )
)


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
# CREATE PAYMENT LINK
# =====================================

@router.post("/create-checkout-session")
async def create_checkout_session(
    user=Depends(get_current_user)
):

    payment_link = client.payment_link.create({

        "amount": 9900,

        "currency": "INR",

        "description":
            "Signal AI Pro Plan",

        "customer": {

            "name":
                user.full_name,

            "email":
                user.email
        },

        "notify": {

            "email": True
        },

        # SUCCESS PAGE
        "callback_url":
           FRONTEND_SUCCESS_URL,

        "callback_method":
            "get",

        "notes": {

            "user_id":
                str(user.id)
        }
    })

    return {

        "checkout_url":
            payment_link["short_url"]
    }


# =====================================
# RAZORPAY WEBHOOK
# =====================================

@router.post("/razorpay-webhook")
async def razorpay_webhook(
    request: Request,
    db: Session = Depends(get_db)
):

    body = await request.body()

    received_signature = request.headers.get(
        "X-Razorpay-Signature"
    )

    generated_signature = hmac.new(

        bytes(
            RAZORPAY_WEBHOOK_SECRET,
            "utf-8"
        ),

        body,

        hashlib.sha256

    ).hexdigest()

    # =====================================
    # VERIFY SIGNATURE
    # =====================================

    if generated_signature != received_signature:

        raise HTTPException(
            status_code=400,
            detail="Invalid signature"
        )

    payload = json.loads(body)

    event = payload["event"]

    # =====================================
    # PAYMENT SUCCESS
    # =====================================

    if event == "payment.captured":

        payment_entity = (
            payload["payload"]
            ["payment"]
            ["entity"]
        )

        user_id = int(
            payment_entity["notes"]["user_id"]
        )

        payment_id = payment_entity["id"]

        customer_email = (
            payment_entity.get("email")
        )

        existing = (
            db.query(Subscription)
            .filter(
                Subscription.user_id == user_id
            )
            .first()
        )

        # =====================================
        # EXTEND SUBSCRIPTION LOGIC
        # =====================================

        now = datetime.utcnow()

        if existing:

            # If subscription still active
            # extend from current expiry

            if (
                existing.current_period_end
                and
                existing.current_period_end > now
            ):

                existing.current_period_end = (
                    existing.current_period_end
                    + timedelta(days=30)
                )

            # If expired
            # start fresh from today

            else:

                existing.current_period_end = (
                    now + timedelta(days=30)
                )

            existing.plan = "pro"

            existing.status = "active"

            existing.payment_customer_id = (
                customer_email
            )

            existing.payment_subscription_id = (
                payment_id
            )

        else:

            subscription = Subscription(

                user_id=user_id,

                payment_customer_id=
                    customer_email,

                payment_subscription_id=
                    payment_id,

                plan="pro",

                status="active",

                current_period_end=
                    now + timedelta(days=30)
            )

            db.add(subscription)

        # =====================================
        # USAGE LOG
        # =====================================

        usage = UsageLog(

            user_id=user_id,

            action="subscription_upgrade",

            ip_address="razorpay_webhook"
        )

        db.add(usage)

        db.commit()

    return {
        "success": True
    }