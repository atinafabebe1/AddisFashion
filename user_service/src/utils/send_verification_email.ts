import sendEmail from './send_email'

const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
): Promise<void> => {
  const verificationUrl = `${process.env.BASE_URL}api/user/verify/${verificationToken}`

  const message = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007BFF; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); background-color: #f5f5f5;">
      <h2 style="color: #007BFF; margin-bottom: 20px;">Thank You for Registering!</h2>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">Please click the following link or copy and paste it into your browser to verify your account:</p>
      <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
        <a href="${verificationUrl}" style="text-decoration: none; color: #007BFF; font-weight: bold; word-wrap: break-word;">${verificationUrl}</a>
      </div>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">If you did not register, you can safely ignore this email.</p>
    </div>
  `

  try {
    await sendEmail({
      email,
      subject: 'Account Verification',
      message,
    })
  } catch (error) {
    throw new Error('Error while sending verification email')
  }
}

export default sendVerificationEmail
