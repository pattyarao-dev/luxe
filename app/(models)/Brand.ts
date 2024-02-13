import mongoose from "mongoose";
import connectDB from "@/app/lib/db";


const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

const brandSchema = new Schema({
    brand_name: { type: String, required: true },
    brand_desc: { type: String, required: true },
    brand_tags: [{ type: String }],

    total_fcount: { type: Number, default: 0 },
    fcount_audit: [{
            date_counted: { type: Date, default: Date.now },
            fcount: { type: Number, default: 0 }
        }],
        // users_followedby: [{
        //     date_followed: { type: Date, default: Date.now },
        //     user_id: { type: Schema.Types.ObjectId, ref: 'User' }
        // }],
    is_full: { type: Boolean, default: false },
 
    branches: [{
        branch_name: { type: String },
        location: {
            type: { type: String, default: 'Point' },
            coordinates: { type: [Number] }
        },
        branch_status: { type: Boolean, default: true }
    }],
    status: { type: Boolean, default: true }
});

// Index the location field for geospatial queries
brandSchema.index({ 'branches.location': '2dsphere' });

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);