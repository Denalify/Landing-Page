import nodemailer from 'nodemailer'

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null

function mailConfig() {
  const config = useRuntimeConfig()
  if (!config.smtpHost || !config.smtpUsername || !config.smtpPassword || !config.mailFromAddress) {
    throw createError({ statusCode: 503, statusMessage: 'Email delivery is not configured' })
  }
  return config
}

function useMailer() {
  if (!transporter) {
    const config = mailConfig()
    transporter = nodemailer.createTransport({
      pool: true,
      host: config.smtpHost,
      port: Number(config.smtpPort) || 587,
      secure: Boolean(config.smtpSecure),
      auth: { user: config.smtpUsername, pass: config.smtpPassword },
      maxConnections: 5,
      maxMessages: 100,
    })
  }
  return transporter
}

type Message = {
  to: string
  subject: string
  html: string
  text: string
  unsubscribeUrl?: string
}

export async function sendNewsletterMail(message: Message) {
  const config = mailConfig()
  const headers: Record<string, string> = {}
  if (message.unsubscribeUrl) {
    headers['List-Unsubscribe'] = `<${message.unsubscribeUrl}>`
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
  }
  return useMailer().sendMail({
    from: { name: config.mailFromName || 'Denalify', address: config.mailFromAddress },
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    headers,
  })
}
