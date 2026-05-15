from sqlalchemy import Column
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

    plan = Column(String)

    status = Column(String)