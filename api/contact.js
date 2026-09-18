import { handleContact } from '../server/contact.js'

/* Vercel serves this file as a serverless function at /api/contact — the
   production counterpart to the Express route in server/index.js. */
export default async function contact(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  // Vercel parses JSON bodies, except when the client sends no content type.
  const body = typeof request.body === 'string'
    ? JSON.parse(request.body || '{}')
    : request.body || {}

  const forwarded = request.headers['x-forwarded-for'] || ''
  const ip = forwarded.split(',')[0].trim() || 'unknown'

  const { status, body: payload } = await handleContact(body, ip)

  return response.status(status).json(payload)
}
