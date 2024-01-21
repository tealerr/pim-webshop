import express from "express"
import mongoose, { Document, SaveOptions } from "mongoose"
import multer from "multer"
import path from "path"

const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/imageDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions)

// Define the image document interface
interface ImageDocument extends Document {
    filename: string
    path: string
}

// Create a schema for the image model
const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
})

// Create the image model
const Image = mongoose.model<ImageDocument>("Image", imageSchema)

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    },
})

const upload = multer({ storage: storage })

// Function to handle image storage
const uploadImageFunction = async (req: any, res: any) => {
    const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
    })

    try {
        const image = await newImage.save()
        res.json({ image })
    } catch (error) {
        res.status(500).send(error)
    }
}

// Define a route for uploading images
app.post("/upload", upload.single("image"), uploadImageFunction)

// Define a route for retrieving images
app.get("/images", async (req, res) => {
    try {
        const images = await Image.find()
        res.json({ images })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

export { uploadImageFunction }
