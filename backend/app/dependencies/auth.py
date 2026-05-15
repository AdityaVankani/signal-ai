from fastapi import Header
from fastapi import HTTPException

from app.core.security import (
    decode_token
)


def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="No token"
        )

    try:

        token = authorization.replace(
            "Bearer ",
            ""
        )

        payload = decode_token(
            token
        )

        if not payload:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return payload

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Auth failed"
        )