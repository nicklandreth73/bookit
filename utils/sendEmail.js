import nodeMailer from "nodemailer"

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  })
  const message = {
    from: `${process.env.SMPT_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(message)
}

export default sendEmail
