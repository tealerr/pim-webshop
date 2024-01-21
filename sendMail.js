const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const yaml = require("js-yaml")
const fs = require("fs")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const data = yaml.load(fs.readFileSync("data.yml", "utf8"))

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: data.username,
        pass: data.password,
    },
})

app.post("/send-email", (req, res) => {
    const { to, subject, text } = req.body

    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body>
            <div style="text-align: center; padding: 20px;">
                <h2>Hello,</h2>
                <p style="color: #333; font-size: 16px;">This is a styled paragraph.</p>
                <p>This is a simple HTML email template. You can customize it further based on your needs.</p>
                <p>Feel free to add more content, styles, and elements to create a rich email experience.</p>
                <p>Best regards,</p>
                <p>${text}</p>
            </div>
        </body>
        </html>
    `

    const mailOptions = {
        from: "PIM WebShop <forwebpim@gmail.com>",
        to,
        subject,
        text,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString())
        }
        res.status(200).send("Email sent: " + info.response)
    })
})

app.get("/health", (req, res) => {
    res.status(200).send("UP")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
