const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use(cors())

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/local", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Create a MongoDB schema and model (replace with your schema)
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    image: String,
})

const User = mongoose.model("customerInfo", userSchema)

// Serve static files (your HTML, CSS, etc.)
app.use(express.static("public"))

// Endpoint to get user data
app.get("/api/getUserData", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
