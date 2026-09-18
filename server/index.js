import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 8787

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  }),
)
app.use(express.json())

const messages = []

const buildTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      // Google displays app passwords as four spaced groups; SMTP wants the
      // bare 16 characters.
      pass: SMTP_PASS.replace(/\s/g, ''),
    },
  })
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', uptime: process.uptime() })
})

app.post('/api/contact', async (request, response) => {
  const { name = '', email = '', message = '' } = request.body || {}

  if (!name.trim() || !email.trim() || !message.trim()) {
    return response.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const payload = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  }

  messages.push(payload)

  const transporter = buildTransporter()

  // Without SMTP the message only ever exists in this process's memory, so say
  // so instead of reporting success and dropping it.
  if (!transporter) {
    return response.status(503).json({
      error: 'Email delivery is not configured on the server.',
    })
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      // Replying in Gmail goes to the sender, not back to yourself.
      replyTo: `${payload.name} <${payload.email}>`,
      subject: `Portfolio contact from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    })

    return response.status(201).json({ success: true, message: 'Email sent successfully.' })
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Failed to process message.' })
  }
})

app.get('/api/messages', (_request, response) => {
  response.json({ count: messages.length, messages })
})

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`)
})
