# Animated Portfolio + Backend

A modern portfolio site built with React + Vite, featuring:

- Dark and light mode toggle (saved in local storage)
- Scroll progress bar + section reveal animations
- Tech stack icons using `react-icons`
- Project, experience, and activity sections
- Contact form connected to an Express backend API

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start backend server:

```bash
npm run dev:server
```

3. In another terminal, start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api/*` to backend on `http://localhost:8787`.

## Backend API

- `GET /api/health` -> Health status
- `POST /api/contact` -> Submit contact form (`name`, `email`, `message`)
- `GET /api/messages` -> In-memory submitted messages (for demo/testing)

## Optional email delivery

Copy `.env.example` to `.env` and configure SMTP values if you want contact form submissions to send email.

Without SMTP config, the backend still accepts messages and responds successfully.

## Build and lint

```bash
npm run lint
npm run build
```
