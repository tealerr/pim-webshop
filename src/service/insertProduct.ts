import { Request, Response } from "express"
import mongoose from "mongoose"
import ProductModel from "../models/product.model"

interface NewProductData {
    name: string
    productId: string
    count: number
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, productId, count }: NewProductData = req.body

        // Connect to the MongoDB database
        await mongoose.connect("mongodb://localhost:27017/local")

        // Insert the new product into the database
        const newProduct: ProductModel = await ProductModel.create({
            name,
            productId,
            count,
        })
        console.log("Product inserted:", newProduct)

        // Send a success response
        res.status(201).json(newProduct)
    } catch (error) {
        // Handle errors during the insertion process
        console.error("Error inserting product:", error)
        res.status(500).json({ error: "Internal Server Error" })
    } finally {
        // Close the MongoDB connection after performing operations
        await mongoose.connection.close()
    }
}
