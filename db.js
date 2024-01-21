const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        // Replace "local" with the desired database name
        const databaseName = "local"

        await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        console.log(`Connected to MongoDB on localhost/${databaseName}`)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

module.exports = connectDB
