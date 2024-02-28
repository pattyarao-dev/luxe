import mongoose from "mongoose";
import connectDB from "@/app/lib/db";


const establishConnection = async () => {
    await connectDB()
};

establishConnection(); 

const Schema = mongoose.Schema

//Source: https://medium.com/@zahiruldu/notification-schema-design-in-mongodb-dbcead07dfd0

const NotificationSchema  = new Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'Brand'}, 
    receiver: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], 
    message: { type: String, required: true }, 
    allowed_branches: [{ type: String }],
    reward: {type:mongoose.Schema.Types.ObjectId, ref:'Reward'}, 
    read_by:[{
     client_id:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    }],
    is_scheduled:{ type: Boolean, default: false }, 
    scheduled_post_date:{type: Date},
    clicks: { type: Number, default: 0 },
    date_posted:{type: Date},
    created_at:{type: Date, default: Date.now},
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);