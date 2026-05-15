from pydantic import BaseModel
from pydantic import EmailStr


class SignupRequest(BaseModel):

    email: EmailStr

    password: str

    full_name: str


class LoginRequest(BaseModel):

    email: EmailStr

    password: str