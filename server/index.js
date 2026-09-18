import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { handleContact } from './contact.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 8787

// Hosts put a proxy in front, so request.ip is the sender only once Express
// is told to read X-Forwarded-For.
app.set('trust proxy', 1)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', uptime: process.uptime() })
})

/* Local development only. In production Vercel serves api/contact.js, which
   calls the same handler. */
app.post('/api/contact', async (request, response) => {
  const { status, body } = await handleContact(request.body, request.ip)
  response.status(status).json(body)
})

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`)
})
