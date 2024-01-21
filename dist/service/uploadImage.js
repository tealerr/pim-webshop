"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageFunction = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Connect to MongoDB
mongoose_1.default.connect("mongodb://localhost:27017/imageDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Create a schema for the image model
const imageSchema = new mongoose_1.default.Schema({
    filename: String,
    path: String,
});
// Create the image model
const Image = mongoose_1.default.model("Image", imageSchema);
// Set up Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// Function to handle image storage
const uploadImageFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
    });
    try {
        const image = yield newImage.save();
        res.json({ image });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.uploadImageFunction = uploadImageFunction;
// Define a route for uploading images
app.post("/upload", upload.single("image"), uploadImageFunction);
// Define a route for retrieving images
app.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield Image.find();
        res.json({ images });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
