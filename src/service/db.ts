// db.ts
import mongoose from "mongoose"
import { any } from "webidl-conversions"

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/local", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

export default connectDB
