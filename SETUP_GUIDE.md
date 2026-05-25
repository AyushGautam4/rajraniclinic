# Rajrani Hospital Setup Guide

## What is in this project

This project contains the React frontend plus a Vercel serverless contact API.

- `frontend/` - main React app
- `api/` - contact form serverless email route
- `.env.example` - mail setup reference
- `vercel.json` - deploy configuration

## Local setup

Open terminal in `frontend` and run:

```bash
npm install
npm start
```

Local URL:

```text
http://localhost:3000
```

## Production build

```bash
cd frontend
npm run build
```

## Main editable files

- `frontend/src/mockData.js`
- `frontend/src/pages/`
- `frontend/src/components/`
- `frontend/src/index.css`

## Notes

- Local `npm start` runs the frontend app.
- Production contact form uses `/api/contact`.
- If local API is not available, the contact form falls back to FormSubmit.
- `frontend/build/` is generated output and can be deleted after deployment.

## Hosting

The project is optimized for **Vercel**. To deploy the generated `frontend/build` folder or for other platforms:

- **Vercel**: Git-based deployment with serverless API support
- Manual deploy to static hosts: Netlify, Hostinger, GoDaddy (upload only `frontend/build`)

## Vercel Deployment

### Quick setup

1. Connect your GitHub repository to Vercel.
2. Vercel reads `vercel.json`, builds from `frontend/`, and serves API routes from `/api`.
3. Add environment variables in `Project Settings > Environment Variables`.
4. Deploy with git push.

### Environment variables

Add these in Vercel and also keep the same values in the project root `.env` file:

- `RESEND_API_KEY` = your Resend API key
- `RESEND_FROM_EMAIL` = verified sender email, for example `Rajrani Hospital <hello@yourdomain.com>`
- `CONTACT_TO_EMAIL` = inbox where contact form messages should arrive

### Contact form API

- Production uses Vercel Serverless Function (`/api/contact`) + Resend for email.
- Development fallback uses FormSubmit for quick testing.
- If API is unavailable, the form falls back gracefully instead of breaking.

## Mail setup

- `RESEND_FROM_EMAIL` must use a verified sender/domain inside Resend.
- If env vars are missing, the site still loads but contact mail will not send from `/api/contact`.
- Emails are sent with reply-to set to the form submitter's email.
