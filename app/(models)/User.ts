import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema


const UserDataSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ['CLIENT', 'ADMIN_ALL', 'ADMIN', 'CASHIER'], required: true },
  password_changed: { type: Boolean, default: false},
  
  //--- FOR CLIENT TYPE ONLY ----
  preference_tags: [{ type: String }],
  total_follow_count: { type: Number, default: 0 },
  following_brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
  following_brands_full: { type: Boolean, default: false },

  //--- FOR ADMIN_ALL TYPE ONLY ----
  company_name: { type: String },
  company_desc: { type: String },
  brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],


  //--- FOR ADMIN AND CASHIER TYPE ONLY ----
  assigned_brand: { type: Schema.Types.ObjectId, ref: 'Brand' },

  //--- FOR CASHIER TYPE ONLY ----
  assigned_branch: { type: String }


});

export default mongoose.models.User || mongoose.model("User", UserDataSchema);