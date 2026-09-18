const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
const MAX_FIELD = 120
const MAX_MESSAGE = 2000

// ponytail: per-process counters, so they reset on restart and don't add up
// across instances. Move to Redis if this ever runs on more than one.
const hits = new Map()

export function rateLimit(ip, now = Date.now()) {
  // Idle senders would otherwise accumulate forever.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] > WINDOW_MS) hits.delete(key)
    }
  }

  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) return false

  recent.push(now)
  hits.set(ip, recent)
  return true
}

/* A carriage return in a header value lets a sender append headers of their
   own, so the name and address reach Subject/Reply-To as one line only. */
const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim()

export function validateContact(body = {}) {
  const { name = '', email = '', message = '', website = '' } = body

  // Honeypot: hidden from people, irresistible to form-filling bots.
  if (String(website).trim()) return { spam: true }

  const payload = {
    name: oneLine(name).slice(0, MAX_FIELD),
    email: oneLine(email).slice(0, MAX_FIELD),
    message: String(message).trim().slice(0, MAX_MESSAGE),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return { error: 'Name, email, and message are required.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { error: 'Please provide a valid email address.' }
  }

  return { payload }
}

export const limits = { WINDOW_MS, MAX_PER_WINDOW }
