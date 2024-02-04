// customer.model.ts
import mongoose, { Document } from "mongoose"

// Define the customer document interface
interface CustomerDocument extends Document {
    email: string
    name: string
    address: string
    city: string
    state: string
    zip: string
    image: string
}

// Define the customer schema
const customerSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    image: String,
})

// Create the customer model
const Customer = mongoose.model<CustomerDocument>("Customer", customerSchema)

export default Customer
