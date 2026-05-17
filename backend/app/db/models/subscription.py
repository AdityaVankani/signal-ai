from datetime import datetime, timedelta

from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base


class Subscription(Base):

    __tablename__ = "subscriptions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # user_id = Column(Integer)
    user_id = Column(

        Integer,

        ForeignKey("users.id")

    )

    stripe_customer_id = Column(String)

    stripe_subscription_id = Column(String)

    plan = Column(String)

    status = Column(String)
    current_period_end = Column(

        DateTime,

        default=lambda:

            datetime.utcnow()

            + timedelta(days=30)

    )

    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )