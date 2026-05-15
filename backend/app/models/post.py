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

    model: str = "gemini-2.5-flash"

    tone: str = "professional"