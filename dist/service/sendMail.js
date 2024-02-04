"use strict"
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, "__esModule", { value: true })
exports.sendMailFunction = void 0
const nodemailer_1 = __importDefault(require("nodemailer"))
const js_yaml_1 = __importDefault(require("js-yaml"))
const fs_1 = __importDefault(require("fs"))
const sendMailFunction = (reqBody) =>
    __awaiter(void 0, void 0, void 0, function* () {
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
            const mailOptions = {
                from: "PIM WebShop <forwebpim@gmail.com>",
                to: reqBody.to,
                subject: reqBody.subject,
                text: reqBody.text,
                html: htmlTemplate,
            }
            const info = yield transporter.sendMail(mailOptions)
            return `Email sent: ${info.response}`
        } catch (error) {
            throw error.toString()
        }
    })
exports.sendMailFunction = sendMailFunction
