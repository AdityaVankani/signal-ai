# import os
# import google.generativeai as genai
# from dotenv import load_dotenv

# load_dotenv()

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# model = genai.GenerativeModel("gemini-3.1-flash-lite-preview")
# model = genai.GenerativeModel("gemini-2.5-flash")


import google.generativeai as genai


def get_gemini_model(
    api_key: str,
    model_name: str
):

    genai.configure(
        api_key=api_key
    )

    return genai.GenerativeModel(
        model_name
    )