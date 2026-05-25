# Rajrani Hospital Frontend

This repository now contains only the frontend website for Rajrani Hospital.

## Project Structure

- `frontend/` - React + Tailwind frontend app
- `SETUP_GUIDE.md` - quick local setup and maintenance notes
- `.gitignore` - ignore rules for dependencies and generated files

## Main Features

- hospital information pages
- services and diagnostics pages
- doctors listing
- contact page
- appointment modal with Call and WhatsApp only
- Hindi and English toggle
- light and dark mode

## Main Content File

Most editable content is in:

- `frontend/src/mockData.js`

## Commands

Run from the `frontend/` folder:

```bash
npm install
npm start
```

Production build:

```bash
npm run build
```

## Deployment

- **Vercel**: Git-based deployment - push the repo root, Vercel builds from `frontend/` and deploys API routes from `/api`
- Contact form uses a Vercel Serverless Function + Resend in production
- If the API is unavailable, the contact form falls back to FormSubmit instead of breaking
- See [SETUP_GUIDE.md](SETUP_GUIDE.md) for environment variables and Vercel configuration
