import nodemailer from 'nodemailer'

interface EmailOptions {
  email: string
  subject: string
  message: string
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true,
  })

  const message = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  }

  try {
    await transporter.sendMail(message)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error while sending email')
  }
}

export default sendEmail
