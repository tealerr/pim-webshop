"use strict"
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, "__esModule", { value: true })
const express_1 = __importDefault(require("express"))
const body_parser_1 = __importDefault(require("body-parser"))
const nodemailer_1 = __importDefault(require("nodemailer"))
const js_yaml_1 = __importDefault(require("js-yaml"))
const fs_1 = __importDefault(require("fs"))
const cors_1 = __importDefault(require("cors"))
const app = (0, express_1.default)()
app.use((0, cors_1.default)())
app.use(body_parser_1.default.json())
const data = js_yaml_1.default.load(
    fs_1.default.readFileSync("data.yml", "utf8")
)
const transporter = nodemailer_1.default.createTransport({
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
        html: htmlTemplate,
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString())
        }
        res.status(200).send("Email sent: " + info.response)
    })
})
app.get("/health", (_req, res) => {
    res.status(200).send("UP")
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
