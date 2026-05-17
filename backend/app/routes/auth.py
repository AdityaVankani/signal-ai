from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.models.auth import (
    SignupRequest,
    LoginRequest
)

from app.repositories.user_repository import (
    get_user_by_email,
    create_user
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


# ====================================
# DB
# ====================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ====================================
# SIGNUP
# ====================================

@router.post("/signup")
async def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        get_user_by_email(
            db,
            data.email
        )
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )
    if len(data.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long"
        )
    password_hash = hash_password(
        data.password
    )

    user = create_user(
        db=db,
        email=data.email,
        password_hash=password_hash,
        full_name=data.full_name
    )

    token = create_access_token({
        "user_id": user.id,
        "email": user.email
    })

    return {

        "token": token,

        "user": {

            "id": user.id,

            "email": user.email,

            "full_name":
                user.full_name
        }
    }


# ====================================
# LOGIN
# ====================================

@router.post("/login")
async def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = get_user_by_email(
        db,
        data.email
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid_password = verify_password(
        data.password,
        user.password_hash
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({

        "user_id": user.id,

        "email": user.email
    })

    return {

        "token": token,

        "user": {

            "id": user.id,

            "email": user.email,

            "full_name":
                user.full_name
        }
    }