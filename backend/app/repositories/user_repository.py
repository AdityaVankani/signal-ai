from app.db.models.user import User


def get_user_by_email(
    db,
    email
):

    return (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )


def create_user(
    db,
    email,
    password_hash,
    full_name
):

    user = User(

        email=email,

        password_hash=password_hash,

        full_name=full_name
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user