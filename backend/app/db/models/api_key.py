from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from app.db.database import Base


class ApiKey(Base):

    __tablename__ = "api_keys"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    provider = Column(String)

    encrypted_key = Column(String)

    active = Column(
        Boolean,
        default=True
    )