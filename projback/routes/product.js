import express, { Router } from "express"
import { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getProducts } from "../controllers/product.js"
import { isAdmin, isSignedIn, isAuthenticated } from "../controllers/auth.js"
import { getUserById } from "../controllers/user.js"


const route = express.Router();

route.param("userId", getUserById)
route.param("productId", getProductById)

//create product
route.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

// read product
route.get("/product/:productId", getProduct)
route.get("/product/photo/:productId", photo)
route.get("/products", getProducts)

// Update product
route.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

// Delete Product

route.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)
export default route;