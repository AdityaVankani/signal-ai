from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.db.database import Base


class UsageLog(Base):

    __tablename__ = "usage_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    action = Column(String)

    ip_address = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )