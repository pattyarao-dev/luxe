import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const UserDataSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
});

export default mongoose.models.User || mongoose.model("User", UserDataSchema);