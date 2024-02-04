// insertProduct.ts
import { Request, Response } from "express"
import Product from "../models/product.model"

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, productId, count } = req.body
        const newProduct = new Product({ name, productId, count })
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error inserting product:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
