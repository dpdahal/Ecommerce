import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    }

}, {
    versionKey: false,
});


CategorySchema.pre("save", function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});
export default mongoose.model("Category", CategorySchema);