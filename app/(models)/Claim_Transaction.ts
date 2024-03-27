import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const ClaimTransaction = new Schema({
    claimed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    reward: { type: Schema.Types.ObjectId, ref: 'Reward' },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Claim_transaction || mongoose.model("Claim_transaction", ClaimTransaction);