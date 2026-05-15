from datetime import datetime
from datetime import timedelta

from jose import jwt
from jose import JWTError

from passlib.context import CryptContext

from app.core.config import (
    JWT_SECRET_KEY,
    JWT_ALGORITHM,
    ACCESS_TOKEN_EXPIRE_HOURS
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ====================================
# HASH PASSWORD
# ====================================

def hash_password(password: str):

    return pwd_context.hash(
        password
    )


# ====================================
# VERIFY PASSWORD
# ====================================

def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ====================================
# CREATE JWT TOKEN
# ====================================

def create_access_token(
    data: dict
):

    to_encode = data.copy()

    expire = (
        datetime.utcnow()
        + timedelta(
            hours=int(
                ACCESS_TOKEN_EXPIRE_HOURS
            )
        )
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


# ====================================
# DECODE TOKEN
# ====================================

def decode_token(token: str):

    try:

        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[
                JWT_ALGORITHM
            ]
        )

        return payload

    except JWTError:

        return None