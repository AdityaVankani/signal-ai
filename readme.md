# Signal AI

AI-powered Chrome Extension for LinkedIn content analysis, rewriting, and engagement optimization.

Signal AI helps creators, founders, recruiters, agencies, and outbound teams improve LinkedIn posts using AI-driven insights and smart outreach workflows directly inside LinkedIn.

---

# What is Signal AI?

Signal AI is a Chrome Extension designed to make LinkedIn outreach and content analysis faster, smarter, and more effective.

The extension analyzes LinkedIn posts in real-time and helps users:

- Understand engagement quality
- Detect buying or networking signals
- Improve post effectiveness
- Generate personalized outreach
- Rewrite content with AI
- Scale outbound communication intelligently

The goal is to reduce manual effort while improving outreach quality and conversion potential.

# Features

## AI LinkedIn Post Analysis
Analyze LinkedIn posts instantly with:
- Hook strength analysis
- Engagement scoring
- Tone detection
- Clarity feedback
- CTA effectiveness



---

## BYOK (Bring Your Own Key)
Users can use:
- Hosted Signal AI credits
OR
- Their own Gemini/OpenAI API key

When BYOK is enabled:
- Hosted quotas are NOT consumed
- Users get unlimited usage based on their own API limits

---

## Free vs Pro Plan

### Free Plan
- Limited monthly analyses
- Basic AI responses
- Standard response speed

### Pro Plan
- Higher quotas
- Faster responses
- Better engagement optimization

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Vite
- Chrome Extension APIs

## Backend
- FastAPI
- SQLAlchemy
- PostgreSQL

## AI
- Gemini API
- Custom prompt engineering pipeline

## Payments
- Razorpay integration
- Webhook-based subscription activation

## Deployment
- Frontend → Vercel
- Backend → Render

---

# Local Setup

## Backend

```
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## Frontend

```
cd frontend frontend

npm install

npm run dev
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=your_db_url

JWT_SECRET_KEY=your_key

GEMINI_API_KEY=your_api_key

RAZORPAY_KEY_ID=your_account_key

RAZORPAY_KEY_SECRET=your_account_secret_key

RAZORPAY_WEBHOOK_SECRET=your_secret
```