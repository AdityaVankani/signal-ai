from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.routes.analyze import (
    router as analyze_router
)

from app.routes.auth import (
    router as auth_router
)

from app.db.database import (
    Base,
    engine
)

# =========================================
# IMPORT TABLES
# =========================================

from app.db.models.user import User

from app.db.models.analysis import (
    Analysis
)

from app.db.models.subscription import (
    Subscription
)

from app.db.models.usage_log import (
    UsageLog
)

from app.db.models.api_key import (
    ApiKey
)


# =========================================
# CREATE TABLES
# =========================================

Base.metadata.create_all(
    bind=engine
)


# =========================================
# FASTAPI APP
# =========================================

app = FastAPI(
    title="Signal AI Backend"
)


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================
# ROUTERS
# =========================================

app.include_router(
    auth_router
)

app.include_router(
    analyze_router
)


# =========================================
# HEALTH CHECK
# =========================================

@app.get("/")
def root():

    return {
        "message":
        "Signal AI Backend Running"
    }