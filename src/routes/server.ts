import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { sendMailFunction } from "../service/sendMail"
import { uploadImageFunction } from "../service/uploadImage"
import * as inventory from "../service/inventory"
import Product from "../models/product.model"
import bodyParser from "body-parser"
import cors from "cors"
import { register } from "../service/regis"
import Customer from "../models/customer.model"
import connectDB from "../service/db"
import { login } from "../service/login"

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(express.static("public"))

const startServer = async () => {
    try {
        await connectDB()
        console.log("Connected to MongoDB")

        // Add route to create a new product
        app.post("/products-create", async (req, res) => {
            try {
                const { name, productId, count } = req.body

                // Check if required fields are present
                if (!name || !productId || !count) {
                    return res
                        .status(400)
                        .json({ error: "Missing required fields" })
                }

                const newProduct = await Product.create({
                    name,
                    productId,
                    count,
                })
                res.status(201).json(newProduct)
            } catch (error: any) {
                res.status(500).send(error.toString())
            }
        })

        app.get("/products", async (req: Request, res: Response) => {
            try {
                const allProducts = await Product.find()
                res.json(allProducts)
            } catch (error: any) {
                res.status(500).send(error.toString())
            }
        })

        // Add route to get product inventory
        app.get("/products/:productId", async (req: Request, res: Response) => {
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

        // Add route to update product count after purchase
        app.post(
            "/checkout/:productId",
            async (req: Request, res: Response) => {
                try {
                    await inventory.checkoutProduct(req, res)
                } catch (error: any) {
                    res.status(500).send(error.toString())
                }
            }
        )

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

        const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Error starting server:", error)
        process.exit(1)
    }
}

startServer()
