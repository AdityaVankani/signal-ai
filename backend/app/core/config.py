from dotenv import load_dotenv

import os

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

JWT_SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY"
)

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM"
)

ACCESS_TOKEN_EXPIRE_HOURS = os.getenv(
    "ACCESS_TOKEN_EXPIRE_HOURS"
)