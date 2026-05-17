from pydantic import BaseModel
from typing import Optional


class PostRequest(BaseModel):

    author: str = "unknown"

    profile_url: str = ""

    post_text: str

    # ====================================
    # NEW FIELDS
    # ====================================

    mode: str = "hosted"

    api_key: Optional[str] = None

    model: str = "gemini-3.1-flash-lite-preview"

    tone: str = "professional"