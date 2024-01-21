import mongoose, { Document, Schema } from "mongoose"

interface ProductModel {
    name: string
    productId: string
    count: number
}

const ProductSchema = new Schema<ProductModel>({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    count: { type: Number, required: true },
})

const ProductModel = mongoose.model<ProductModel>("Product", ProductSchema)

export default ProductModel
