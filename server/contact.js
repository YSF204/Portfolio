import nodemailer from 'nodemailer'
import { rateLimit, validateContact } from './guards.js'

/* One implementation behind both front doors: the Express server used in
   local development and the Vercel function used in production. Returns a
   plain { status, body } so neither has to know about the other's response
   object. */

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

export async function handleContact(body, ip) {
  if (!rateLimit(ip)) {
    return { status: 429, body: { error: 'Too many messages. Please try again later.' } }
  }

  const { payload, error, spam } = validateContact(body)

  if (error) return { status: 400, body: { error } }

  // Answer a bot exactly as if it had worked, so it learns nothing.
  if (spam) return { status: 201, body: { success: true, message: 'Email sent successfully.' } }

  const transporter = buildTransporter()

  // Without SMTP the message would vanish, so say so rather than report success.
  if (!transporter) {
    return { status: 503, body: { error: 'Email delivery is not configured on the server.' } }
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

    return { status: 201, body: { success: true, message: 'Email sent successfully.' } }
  } catch (sendError) {
    return { status: 500, body: { error: sendError.message || 'Failed to process message.' } }
  }
}
