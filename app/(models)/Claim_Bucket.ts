import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const ClaimsDataSchema = new Schema({
    claims_transactions: [{
        timestamp: { type: Date, default: Date.now },
        claimed_by: { type: Schema.Types.ObjectId, ref: 'User' },
        processed_by: { type: Schema.Types.ObjectId, ref: 'User' },
        sales_count: { type: Number, required: true },
        sales_value: { type: Number, required: true }
    }],
    bucket_claim_count: { type: Number, default: 0 },
    bucket_sales_total: { type: Number, default: 0 },
    bucket_sales_count: { type: Number, default: 0 },
    is_full: { type: Boolean, default: false }

});

export default mongoose.models.Claim_bucket || mongoose.model("Claim_bucket", ClaimsDataSchema);