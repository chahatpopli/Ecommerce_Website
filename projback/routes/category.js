import express, { Router } from "express"
import { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.js"
import { isAdmin, isSignedIn, isAuthenticated } from "../controllers/auth.js"
import { getUserById } from "../controllers/user.js"


const route = express.Router();

route.param("userId", getUserById)
route.param("categoryId", getCategoryById)


route.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

route.get("/category/:categoryId", getCategory)
route.get("/categories", getAllCategories)

route.put("/category/:createId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

route.delete("/category/:createId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory)

export default route