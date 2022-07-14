import User from "../models/user.js"
import { Order } from "../models/order.js"

export const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: " No user was found in DB"
            })
        }
        req.profile = user;
        next();
    })
}

export const getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

export const getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: " No users are found in DB"
            })
        }
        res.json(users)
    })
}

export const updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, userFindAndModify: false },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    err: "You are Not authorised to update the User"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)

        })
}

export const userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    err: "No Order in this Account"
                })
            }
            return res.json(order)
        })
}

export const pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            catagory: product.catagory,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    // store purchase in database
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { purchases: purchases } }, { new: true },
        (err, purchases) => {
            if (err) {
                res.status(400).json({
                    err: "Unable to save purchases"
                })
            }
            next();

        })

}