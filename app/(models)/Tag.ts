import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const TagsSchema = new Schema({
    preferences: [{
        tag_name: { type: String }
    }], 
    is_full: {type: Boolean, default: false}
});

export default mongoose.models.Tag || mongoose.model("tag", TagsSchema);