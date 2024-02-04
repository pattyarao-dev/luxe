import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const client = await mongoose.connect(uri);
  console.log("MongoDB connected!");
};

export default connectDB;