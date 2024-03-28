import { ObjectId } from "mongoose"

export interface NotificationTypes {
    _id: ObjectId
    sender_name: string
    receiver: ObjectId
    message: string
    reward: ObjectId
    date_posted: Date
}
