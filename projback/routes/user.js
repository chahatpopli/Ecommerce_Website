import { Router } from "express";
import express from "express";
import { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } from "../controllers/user.js"
import { isAuthenticated, isSignedIn, isAdmin } from "../controllers/auth.js"

const route = express.Router();

route.param("userId", getUserById)
route.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
route.get("/users", getAllUsers)
route.put("/user/:userId", updateUser)
route.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)



export default route;