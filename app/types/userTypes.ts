import { ObjectId } from "mongoose"

export interface UserTypes {
    _id: ObjectId
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    user_type: string
    password_changed: boolean

    //for client type
    preference_tags: string[]
    total_follow_count: number
    following_brands: ObjectId
    following_brands_full: boolean
    saved_rewards: ObjectId

    //for admin
    company_name: string
    company_desc: string
    brands: ObjectId

    //for admin and cashier
    assigned_brand: ObjectId

    //for cashier
    assigned_branch: string



  }