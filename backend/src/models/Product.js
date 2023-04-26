import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    product_name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    }
}, {
    versionKey: false,
});

export default mongoose.model("Product", productSchema);