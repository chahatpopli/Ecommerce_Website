import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema

const productSchema = new schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        maxLength: 32
    },
    category: {
        type: ObjectId,
        ref: "Catagory",
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });



const product = mongoose.model("Product", productSchema);
export default product;