import { Router } from "express";
import express from "express";
import { signout, signup, signin, isSignedIn } from "../controllers/auth.js"
import { check } from "express-validator"

const route = express.Router()

route.post("/signup", [
    check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Email is Required").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({ min: 3 })
], signup)

route.post("/signin", [
    check("password", "password is Required").isLength({ min: 1 })
], signin)

route.get("/signout", signout)

route.get("/testRoute", isSignedIn, (req, res) => {
    res.send("user Issigned route")
})

export default route;