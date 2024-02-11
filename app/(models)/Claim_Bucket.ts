import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const ClaimsDataSchema = new Schema({
    purchases: [{
        timestamp: { type: Date, default: Date.now },
        claimed_by: { type: Schema.Types.ObjectId, ref: 'User' },
        processed_by: { type: Schema.Types.ObjectId, ref: 'User' },
        sales_count: { type: Number, required: true },
        sales_value: { type: Number, required: true }
    }],
    bucket_claim_count: { type: Number, default: 0 },
    bucket_purchases_total: { type: Number, default: 0 },
    bucket_purchases_count: { type: Number, default: 0 },
    is_full: { type: Boolean, default: false }

});

export default mongoose.models.Claim || mongoose.model("Claim_bucket", ClaimsDataSchema);