from fastapi import Header
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.security import (
    decode_token
)

from app.db.database import (
    SessionLocal
)

from app.db.models.user import (
    User
)


def get_current_user(
    authorization: str = Header(None)
):

    # ========================================
    # CHECK HEADER
    # ========================================

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="No token"
        )

    try:

        # ========================================
        # EXTRACT TOKEN
        # ========================================

        token = authorization.replace(
            "Bearer ",
            ""
        )

        # ========================================
        # DECODE TOKEN
        # ========================================

        payload = decode_token(
            token
        )

        if not payload:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        # ========================================
        # GET USER ID
        # ========================================

        user_id = payload.get(
            "user_id"
        )

        if not user_id:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        # ========================================
        # DB SESSION
        # ========================================

        db: Session = SessionLocal()

        # ========================================
        # FIND USER
        # ========================================

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        db.close()

        # ========================================
        # USER NOT FOUND
        # ========================================

        if not user:

            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Auth failed"
        )