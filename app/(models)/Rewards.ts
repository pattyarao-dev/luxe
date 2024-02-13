import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const RewardDateSchema = new Schema({
    reward_name: { type: String, required: true },
    reward_desc: { type: String, required: true },
    brand_id: {type: Schema.Types.ObjectId, ref: 'Brand'},
    allowed_branches: [String],
    cap: { type: Number, required: true },
    reward_type: { type: String, enum: ['DISCOUNT', 'FREEBIE'], required: true },
    discount: { type: Number },
    freebies: [{
        name: { type: String},
        qty: { type: Number}
    }],
    claim_type: [{ type: String, enum: ['PURCHASE_VALUE', 'ITEM_QTY']}],
    // Reward Conditions                                                                                                                                                                                                                                                                         
    min_spent: { type: Number, default: null },
    min_items: { type: Number, default: null },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    expiry: { type: Date },
    is_expired: { type: Boolean, default: false },
    reward_tags: [String],
    claim_buckets: [{ type: Schema.Types.ObjectId, ref: 'Claim' }],
    claim_count: { type: Number, default: 0 },
    sales_total: { type: Number, default: 0 },
    sales_count: { type: Number, default: 0 }

});

export default mongoose.models.Reward || mongoose.model("Reward", RewardDateSchema);