"use strict"
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, "__esModule", { value: true })
exports.checkoutProduct =
    exports.getProductInventory =
    exports.updateProductCount =
    exports.getProductById =
        void 0
const product_model_1 = __importDefault(require("../models/product.model"))
const getProductById = (productId) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findById(productId)
            if (!product) {
                throw new Error("Product not found")
            }
            return product
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    })
exports.getProductById = getProductById
const updateProductCount = (productId, quantityToSubtract) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findById(productId)
            if (!product) {
                throw new Error("Product not found")
            }
            if (product.count < quantityToSubtract) {
                throw new Error("Not enough stock")
            }
            product.count -= quantityToSubtract
            yield product.save()
            return product
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    })
exports.updateProductCount = updateProductCount
const getProductInventory = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield (0, exports.getProductById)(
                req.params.productId
            )
            res.json(product)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
exports.getProductInventory = getProductInventory
const checkoutProduct = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { productId } = req.params
            const { quantity } = req.body
            const updatedProduct = yield (0, exports.updateProductCount)(
                productId,
                quantity
            )
            res.json(updatedProduct)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
exports.checkoutProduct = checkoutProduct
