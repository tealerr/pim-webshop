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
const express_1 = __importDefault(require("express"));
const sendMail_1 = require("../service/sendMail");
const uploadImage_1 = require("../service/uploadImage");
const inventory_1 = require("../service/inventory");
const product_model_1 = __importDefault(require("../models/product.model")); // Import the Product type
const app = (0, express_1.default)();
// Add route to get all products
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield product_model_1.default.find();
        res.json(allProducts);
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
}));
// Add route to get product inventory
app.get("/products/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, inventory_1.getProductInventory)(req, res);
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
}));
// Add route to update product count after purchase
app.post("/checkout/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, inventory_1.checkoutProduct)(req, res);
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
}));
app.post("/send-email", (req, res) => {
    (0, sendMail_1.sendMailFunction)(req.body)
        .then((result) => res.status(200).send(result))
        .catch((error) => res.status(500).send(error.toString()));
});
app.post("/upload-image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, uploadImage_1.uploadImageFunction)(req, res);
        res.status(200).send("Image uploaded successfully");
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
