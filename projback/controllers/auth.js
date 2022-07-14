import User from "../models/user.js"
import { check, validationResult } from "express-validator"

import jwt from "jsonwebtoken"
import expressJwt from "express-jwt"

export const signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Signout successfully"
    })
}

export const signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "not able to save user"
            })
        }
        res.send({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

export const signin = (req, res) => {

    const errors = validationResult(req)
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "user does not exist with this email"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        // creation of token
        const token = jwt.sign({ _id: user._id }, "learncodeonline")

        // puting token into ussers cookie

        res.cookie("token", token, { expire: new Date() + 9999 })

        //send response to frontend 

        const { _id, name, email, role, phonenumber } = user
        return res.json({ token, user: { _id, name, email, role, phonenumber } })
    });
};

//protected routes

export const isSignedIn = expressJwt({
    secret: "learncodeonline",
    userProperty: "auth",
    algorithms: ['HS256']
});

export const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
};