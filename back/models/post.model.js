import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
        default: "",
    },
    likes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);