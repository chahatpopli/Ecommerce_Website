import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema

const productcartSchema = new schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number

});

export const ProductCart = mongoose.model("ProductCart", productcartSchema);

const orderSchema = new schema({
    products: [productcartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);