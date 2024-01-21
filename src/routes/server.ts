import express, { Request, Response, NextFunction } from "express"
import { sendMailFunction } from "../service/sendMail"
import { uploadImageFunction } from "../service/uploadImage"
import * as inventory from "../service/inventory"
import Product from "../models/product.model"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

// Add route to get all products
app.get("/products", async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.find()
        res.json(allProducts)
    } catch (error: any) {
        res.status(500).send(error.toString())
    }
})

// Add route to create a new product
app.post("/products-create", async (req, res) => {
    try {
        const { name, productId, count } = req.body

        // Check if required fields are present
        if (!name || !productId || !count) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const newProduct = await Product.create({ name, productId, count })
        res.status(201).json(newProduct)
    } catch (error: any) {
        res.status(500).send(error.toString())
    }
})

// Add route to get product inventory
app.get("/products/:productId", async (req: Request, res: Response) => {
    try {
        const product = await inventory.getProductById(req.params.productId)
        res.json(product)
    } catch (error: any) {
        console.error(error)
        res.status(500).send(error.toString())
    }
})

// Add route to update product count after purchase
app.post("/checkout/:productId", async (req: Request, res: Response) => {
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
