from app.db.models.analysis import (
    Analysis
)


def save_analysis(
    db,
    post_text,
    user_id,
    tone,
    result
):

    analysis = Analysis(
        user_id= user_id,
        signal=result["signal"],

        confidence=result["confidence"],

        reasoning=result["reasoning"],

        post_text=post_text,

        tone=tone
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis