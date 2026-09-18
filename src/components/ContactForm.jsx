import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Loader2, Send } from 'lucide-react'

/* Same origin in dev (Vite proxies /api to the Express server) and in any
   deployment that serves both from one host. Split hosts set VITE_CONTACT_API. */
const ENDPOINT = import.meta.env.VITE_CONTACT_API || '/api/contact'
const EMAIL = 'Yousef204b@gmail.com'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
]

const inputClass =
  'chip focus-ring w-full rounded-[8px] bg-white/70 px-3 py-2.5 text-[13px] text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 hover:border-[#8B0000]/35 dark:bg-[#0d0d0f]/70 dark:text-[#f3f3f3] dark:placeholder:text-[#5f5f68]'

const labelClass =
  'mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 dark:text-[#7e7e89]'

export function ContactForm({ open }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    // Read the form before the first await; React clears currentTarget after.
    const payload = Object.fromEntries(new FormData(event.currentTarget))

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(body.error || 'The message could not be sent.')
      setStatus('sent')
    } catch (requestError) {
      setError(requestError.message || 'The message could not be sent.')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <Motion.div
          key="contact-form"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="mx-auto mt-8 w-full max-w-[520px] px-1 text-left">
            <div className="chip card-raised overflow-hidden rounded-[14px] bg-white/70 backdrop-blur-sm dark:bg-[#0d0d0f]/70">
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B0000] dark:text-[#c44]">
                  Direct line
                </span>
                <span className="font-mono text-[9px] tracking-[0.12em] text-zinc-400 dark:text-[#5f5f68]">
                  {status === 'sent' ? 'SENT' : 'NEW MESSAGE'}
                </span>
              </div>

              <div className="h-px structural-dashed-t structural-grid" />

              {status === 'sent' ? (
                <Motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 px-5 py-10 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B0000]/35 bg-[#8B0000]/5 text-[#8B0000] dark:bg-[#8B0000]/10 dark:text-[#c44]">
                    <Check size={17} />
                  </span>
                  <p className="m-0 text-[14px] font-semibold text-zinc-900 dark:text-[#f3f3f3]">
                    Message sent
                  </p>
                  <p className="m-0 max-w-[34ch] text-[12px] leading-5 text-zinc-500 dark:text-[#8b8b95]">
                    Thanks for reaching out — I&apos;ll get back to you at the address you left.
                  </p>
                </Motion.div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4 px-5 py-5">
                  {/* Honeypot. Off-screen rather than display:none, which some
                      bots know to skip, and hidden from screen readers. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  {FIELDS.map((field, index) => (
                    <Motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.14 + index * 0.07 }}
                    >
                      <label className={labelClass} htmlFor={`contact-${field.name}`}>
                        {field.label}
                      </label>
                      <input
                        id={`contact-${field.name}`}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        required
                        maxLength={120}
                        disabled={status === 'sending'}
                        className={inputClass}
                      />
                    </Motion.div>
                  ))}

                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.28 }}
                  >
                    <label className={labelClass} htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      maxLength={2000}
                      placeholder="What are you building?"
                      disabled={status === 'sending'}
                      className={`${inputClass} resize-none leading-6`}
                    />
                  </Motion.div>

                  {status === 'error' && (
                    <Motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="m-0 text-[11px] leading-5 text-[#8B0000] dark:text-[#c44]"
                    >
                      {error}{' '}
                      <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                        Email me directly instead
                      </a>
                      .
                    </Motion.p>
                  )}

                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    className="mt-1 flex items-center justify-between gap-3"
                  >
                    <a
                      href={`mailto:${EMAIL}`}
                      className="focus-ring inline-flex items-center gap-1 rounded-md font-mono text-[10px] tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-900 dark:text-[#5f5f68] dark:hover:text-white"
                    >
                      Or email directly <ArrowUpRight size={11} />
                    </a>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="focus-ring inline-flex items-center gap-2 rounded-[10px] border border-[#8B0000]/35 bg-[#8B0000]/5 px-4 py-2.5 text-[12px] font-semibold text-[#8B0000] transition-all duration-200 hover:-translate-y-px hover:bg-[#8B0000]/10 disabled:translate-y-0 disabled:opacity-60 dark:bg-[#8B0000]/10 dark:text-[#cc4444] dark:hover:bg-[#8B0000]/20"
                    >
                      {status === 'sending'
                        ? <><Loader2 size={13} className="animate-spin" /> Sending</>
                        : <><Send size={13} /> Send message</>}
                    </button>
                  </Motion.div>
                </form>
              )}
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}
