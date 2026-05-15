from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from datetime import datetime

from app.db.database import Base


class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    signal = Column(String)

    confidence = Column(Float)

    reasoning = Column(Text)

    post_text = Column(Text)

    tone = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )