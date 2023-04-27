import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now

    }
});

export default mongoose.model("Order", orderSchema);