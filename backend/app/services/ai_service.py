import json
import os

from dotenv import load_dotenv

from app.utils.gemini_client import (
    get_gemini_model
)

load_dotenv()


MASTER_PROMPT = """
Analyze this LinkedIn post.

Return ONLY valid JSON.

{{
  "signal": "hiring | growth | pain | ignore",
  "confidence": number,
  "reasoning": "short reason",
  "messages": [
    "short outreach message",
    "short outreach message"
  ]
}}

Rules:
- messages under 50 words
- conversational
- personalized
- no markdown
- tone must be: {tone}

Post:
{post}
"""


def analyze_post_with_ai(
    post_text: str,
    tone: str,
    mode: str,
    api_key: str,
    model: str
):

    # ====================================
    # CLEAN POST
    # ====================================

    clean_post = " ".join(
        post_text.split()
    )

    clean_post = clean_post[:1000]

    # ====================================
    # API KEY LOGIC
    # ====================================

    if mode == "byok":

        if not api_key:

            raise Exception(
                "Missing API key"
            )

        api_key = api_key

    else:

        api_key = os.getenv(
            "GEMINI_API_KEY"
        )

    # ====================================
    # CREATE MODEL DYNAMICALLY
    # ====================================

    model = get_gemini_model(
        api_key=api_key,
        model_name=model
    )

    # ====================================
    # CUSTOM PROMPT SUPPORT
    # ====================================

    prompt = MASTER_PROMPT.format(

    post=clean_post,

    tone=tone

)

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text.strip()

        # Remove markdown wrapping
        text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(text)

        return data

    except Exception as e:

        print("AI ERROR:", e)

        return {
            "signal": "ignore",
            "confidence": 0,
            "reasoning": "AI processing failed.",
            "messages": [
                "No message generated.",
                "No message generated."
            ]
        }