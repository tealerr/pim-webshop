import { Request, Response } from "express"

import Product from "../models/product.model"
import bodyParser from "body-parser"

export const getProductById = async (productId: string) => {
    try {
        const product = await Product.findOne({ productId })
        if (!product) {
            throw new Error("Product not found")
        }
        return { name: product.name }
    } catch (error: any) {
        console.error("Error in getProductById:", error)
        throw new Error("Internal Server Error")
    }
}

export const updateProductCount = async (
    productId: string,
    quantityToSubtract: number
) => {
    try {
        const product = await Product.findById(productId)
        if (!product) {
            throw new Error("Product not found")
        }

        if (product.count < quantityToSubtract) {
            throw new Error("Not enough stock")
        }

        product.count -= quantityToSubtract
        await product.save()

        return product
    } catch (error: any) {
        throw new Error("Internal Server Error")
    }
}

export const getProductInventory = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(req.params.productId) // Pass the productId as a string
        res.json(product)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const checkoutProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const { quantity } = req.body

        const updatedProduct = await updateProductCount(productId, quantity)
        res.json(updatedProduct)
    } catch (error: any) {
        console.error("Error in checkoutProduct:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
