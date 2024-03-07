import { ObjectId } from "mongoose"

interface FCountTypes {
    date_counted: Date
    fCount: number
}

interface BranchTypes {
    branch_name: string
    location: LocationTypes
    branch_status: boolean
}

interface LocationTypes {
    type: string
    coordinates: number
}

export interface BrandTypes {
    id: ObjectId
    brand_name: string
    brand_desc: string
    brand_tags: string[]
    total_fcount: number
    fcount_audit: FCountTypes[]
    is_full: boolean
    branches: BranchTypes[]
    status: boolean

}