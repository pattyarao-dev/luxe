import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

// Establish database connection
const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

// Define Mongoose Schema
const Schema = mongoose.Schema

const TagsSchema = new Schema({
    tag_name: { type: String }
});

// Define and export the model
export default mongoose.models.Tag || mongoose.model("Tag", TagsSchema);
