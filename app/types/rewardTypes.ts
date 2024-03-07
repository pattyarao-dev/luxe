import { ObjectId } from "mongoose"

interface FreebiesTypes {
  name: string
  qty: number
}

export interface RewardTypes {
    id: ObjectId
    reward_name: string
    reward_desc: string
    brand_id: ObjectId
    allowed_branches: string[]
    cap: number
    reward_type: string
    discount: number
    freebies: FreebiesTypes[]
    claim_type: string
    min_spent: number
    min_items: number
    status: boolean
    createdAt: Date
    expiry: Date
    is__expired: boolean
    reward_tags: string[]
    claim_buckets: ObjectId
    claim_count: number
    sales_total: number
    sales_count: number

  }