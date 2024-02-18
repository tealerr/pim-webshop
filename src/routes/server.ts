import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { sendMailFunction } from "../service/sendMail"
import { uploadImageFunction } from "../service/uploadImage"
import * as inventory from "../service/inventory"
import bodyParser from "body-parser"
import cors from "cors"
import { register } from "../service/regis"
import Customer from "../models/customer.model"
import connectDB from "../service/db"
import { login } from "../service/login"
import { addProduct } from "../service/insertProduct"
import path from "path"
import * as customerInfo from "../service/customerInfo"

const app = express()
app.use(cors({
    origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}))

app.use(bodyParser.json())
app.use(express.static("public"))

const startServer = async () => {
    try {
        await connectDB()
        console.log("Connected to MongoDB")

        app.post("/api/create-products", addProduct)

        app.get("/products", inventory.getAllProducts)
        app.get("/api/customer-info", customerInfo.getCustomerInfo)
        app.post("/api/create-order", customerInfo.insertCustomerInfo)

        app.get("/product/:productId", async (req: Request, res: Response) => {
            try {
                const product = await inventory.getProductById(
                    req.params.productId
                )
                res.json(product)
            } catch (error: any) {
                console.error(error)
                res.status(500).send(error.toString())
            }
        })

        app.post("/checkout", async (req: Request, res: Response) => {
            try {
                await inventory.checkoutProduct(req, res)
            } catch (error: any) {
                res.status(500).send(error.toString())
            }
        })

        app.post("/send-email", (req: Request, res: Response) => {
            sendMailFunction(req.body)
                .then((result) => res.status(200).send(result))
                .catch((error) => res.status(500).send(error.toString()))
        })

        app.post("/upload-image", async (req: Request, res: Response) => {
            try {
                await uploadImageFunction(req, res)
                res.status(200).send("Image uploaded successfully")
            } catch (error: any) {
                res.status(500).send(error.toString())
            }
        })

        app.post("/register", register)
        
        app.post("/login", login)

        app.get("/health", (req, res) => {
            res.status(200).send("UP")
        })

        app.get("/api/getCustomerData", async (req, res) => {
            try {
                const customers = await Customer.find()
                res.json(customers)
            } catch (error) {
                console.error("Error fetching data:", error)
                res.status(500).json({ error: "Internal Server Error" })
            }
        })

        const PORT = 4000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Error starting server:", error)
        process.exit(1)
    }

    app.use("/", express.static(path.join(__dirname, "..", "view")))
}

startServer()
