import mongoose from "mongoose";
import connectDB from "@/app/lib/db";
import { string } from "prop-types";


const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const preferenceScoresSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    preferences: [{
        tag_name: { type: String }, 
        score: { type: Number }
    }]
});

export default mongoose.models.PreferenceSocres || mongoose.model("reward_score", preferenceScoresSchema);