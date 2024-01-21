import nodemailer from "nodemailer"
import yaml from "js-yaml"
import fs from "fs"

interface MailRequest {
    to: string
    subject: string
    text: string
}

const sendMailFunction = async (reqBody: MailRequest): Promise<string> => {
    try {
        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${reqBody.subject}</title>
        </head>
        <body>
            <div style="text-align: center; padding: 20px;">
                <h2>Hello,</h2>
                <p style="color: #333; font-size: 16px;">This is a styled paragraph.</p>
                <p>This is a simple HTML email template. You can customize it further based on your needs.</p>
                <p>Feel free to add more content, styles, and elements to create a rich email experience.</p>
                <p>Best regards,</p>
                <p>${reqBody.text}</p>
            </div>
        </body>
        </html>
        `

        const data: Record<string, any> = yaml.load(
            fs.readFileSync("data.yml", "utf8")
        ) as Record<string, any>

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data.username,
                pass: data.password,
            },
        })

        const mailOptions = {
            from: "PIM WebShop <forwebpim@gmail.com>",
            to: reqBody.to,
            subject: reqBody.subject,
            text: reqBody.text,
            html: htmlTemplate,
        }

        const info = await transporter.sendMail(mailOptions)

        return `Email sent: ${info.response}`
    } catch (error: any) {
        throw error.toString()
    }
}

export { sendMailFunction }
