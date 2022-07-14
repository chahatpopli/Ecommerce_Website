import mongoose from "mongoose"

const schema = mongoose.Schema

const categorySchema = new schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
        unique: true
    }
}, { timestamps: true });



const category = mongoose.model("Category", categorySchema);
export default category;