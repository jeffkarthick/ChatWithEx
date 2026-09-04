# ChatWithEx

Vercel-ready React/Vite MVP for creating an AI chat simulation from an exported historical chat.

## Setup
1. Upload this folder to GitHub.
2. Import the repo into Vercel.
3. Add environment variables from `.env.example` in Vercel.
4. `GROQ_API_KEY` must be a newly generated key; never commit it.
5. Create an Upstash Redis database and add its REST URL/token.
6. Deploy.

Put your own `logo.png` in `public/` if you want the site to use your logo.

## Important
The app stores a compact locked profile in Redis, not the original chat. The chat endpoint uses the locked profile and temporary recent conversation context. It does not retrain or update the profile from new messages.

For production, review privacy policy, retention, abuse controls, and legal requirements before public launch.
