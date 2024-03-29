import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand"
import Rewards from "@/app/(models)/Rewards"
import Claim_Bucket from "@/app/(models)/Claim_Bucket"

interface ChartParameters {
    user_type: string
    brand: string
    branch: string
    start_date: string
    end_date: string
}

interface RewardTypes {
    discount_claims: number //default 0
    freebies_claims: number
}

interface HorizBarAdminAll {
    brand_id: string
    brand_name: string
    discount_claims: number //default 0
    freebies_claims: number
}

interface HorizBarAdmin {
    branch_name: string
    discount_claims: number //default 0
    freebies_claims: number
}

// GET
export async function POST(req: NextRequest) {
    const userid = req.nextUrl.searchParams.get("id") as string
    const data: ChartParameters = await req.json()
    try {
        // IF user_type == 'ADMIN_ALL' Get number of claims per Brand
        if (data.user_type === "ADMIN_ALL") {
            let output: HorizBarAdminAll[]
            // GET Brands Associated
            let user_data = await User.findById(userid)

            // GET Brand IDs
            let brand_ids = user_data.brands

            // GET Rewards from Brand IDs
            let brands = await Brand.find({ _id: { $in: brand_ids } })

            // APPLY BRAND FILTER IF EXISTS
            if (data.brand !== "") {
                console.log("here")
                brands = brands.filter(
                    (brand: any) => brand._id.toString() === data.brand
                )
            }

            output = await Promise.all(
                brands.map(async (brand) => {
                    // For each BRAND ID...

                    // Get the rewards associated with the brand
                    let temp_rewards = await Rewards.find({
                        brand_id: brand._id.toString()
                    })

                    let claim_value: number = 0 // Initialize claim_value to 0
                    let temp_discount: number = 0
                    let temp_freebies: number = 0

                    // Iterate over each reward
                    for (let reward of temp_rewards) {
                        // Iterate over each bucket ID in the reward
                        for (let bucketid of reward.claim_buckets) {
                            let temp_bucket_id: string = bucketid.toString()

                            // Assuming Claim_Bucket.findById returns a promise
                            let bucket_content = await Claim_Bucket.findById(
                                temp_bucket_id
                            )

                            // Aggregate claims based on filters (DATE FILTERS)
                            if (
                                data.start_date === "" ||
                                data.end_date === ""
                            ) {
                                // IF start_date and end_date are empty

                                if (reward.reward_type === "DISCOUNT") {
                                    temp_discount +=
                                        bucket_content.bucket_claim_count
                                } else {
                                    temp_freebies +=
                                        bucket_content.bucket_claim_count
                                }
                            } else {
                                // IF THERE ARE SPECIFIED DATE FILTERS
                                let startDate = new Date(data.start_date)
                                let endDate = new Date(data.end_date)

                                let filteredTransactions =
                                    bucket_content.claims_transactions.filter(
                                        (transaction: any) => {
                                            let transactionDate = new Date(
                                                transaction.timestamp
                                            )
                                            return (
                                                transactionDate >= startDate &&
                                                transactionDate <= endDate
                                            )
                                        }
                                    )

                                if (reward.reward_type === "DISCOUNT") {
                                    temp_discount += filteredTransactions.length
                                } else {
                                    temp_freebies += filteredTransactions.length
                                }
                            }
                        }

                        console.log(
                            reward.reward_name,
                            "disc val: ",
                            temp_discount,
                            "freebie val: ",
                            temp_freebies
                        )
                    }

                    // Return the aggregated values after iterating over all rewards
                    return {
                        brand_id: brand._id,
                        brand_name: brand.brand_name,
                        discount_claims: temp_discount,
                        freebies_claims: temp_freebies // or whatever default value you want for claims
                    }
                })
            )

            const labels = output.map((item) => item.brand_name)
            const discountClaims = output.map((item) => item.discount_claims)
            const freebiesClaims = output.map((item) => item.freebies_claims)

            return Response.json({ labels, discountClaims, freebiesClaims })
        }
        // IF user_type == 'ADMIN' Get number of claims per Branch
        else if (data.user_type === "ADMIN") {
            // Set Output Object
            let output: HorizBarAdmin[]

            // Get User Data
            let user_data = await User.findById(userid)

            // BRAND ID
            let brandid: string = user_data.assigned_brand.toString()

            // Get Associated Brands
            const brand = await Brand.findById(brandid)

            // Get List of Branch Names
            const branches = brand.branches.map((branch: any) => {
                return branch.branch_name
            })

            // Get All Rewards of the Brand
            let rewards = await Rewards.find({ brand_id: brandid })

            // APPLY BRANCH FILTER IF EXISTS
            if (data.branch !== "") {
                console.log("here")
                rewards = rewards.filter((reward: any) =>
                    reward.allowed_branches.includes(data.branch)
                )
            }

            // For each branch, check if each reward is allowed to be redeemed in that reward
            output = await Promise.all(
                branches.map(async (branch: string) => {
                    let claim_value: number = 0 // Initialize claim_value to 0
                    let temp_discount: number = 0
                    let temp_freebies: number = 0

                    // Iterate over each reward
                    for (let reward of rewards) {
                        // Check if the branch matches with the allowed branches in reward
                        if (reward.allowed_branches.includes(branch)) {
                            // Iterate over each bucket ID in the reward
                            for (let bucketid of reward.claim_buckets) {
                                let temp_bucket_id: string = bucketid.toString()

                                // Assuming Claim_Bucket.findById returns a promise
                                let bucket_content =
                                    await Claim_Bucket.findById(temp_bucket_id)

                                // Aggregate claims based on filters (DATE FILTERS)
                                if (
                                    data.start_date === "" ||
                                    data.end_date === ""
                                ) {
                                    // IF start_date and end_date are empty
                                    if (reward.reward_type === "DISCOUNT") {
                                        temp_discount +=
                                            bucket_content.bucket_claim_count
                                    } else {
                                        temp_freebies +=
                                            bucket_content.bucket_claim_count
                                    }
                                } else {
                                    // IF THERE ARE SPECIFIED DATE FILTERS
                                    let startDate = new Date(data.start_date)
                                    let endDate = new Date(data.end_date)

                                    let filteredTransactions =
                                        bucket_content.claims_transactions.filter(
                                            (transaction: any) => {
                                                let transactionDate = new Date(
                                                    transaction.timestamp
                                                )
                                                return (
                                                    transactionDate >=
                                                        startDate &&
                                                    transactionDate <= endDate
                                                )
                                            }
                                        )

                                    if (reward.reward_type === "DISCOUNT") {
                                        temp_discount +=
                                            filteredTransactions.length
                                    } else {
                                        temp_freebies +=
                                            filteredTransactions.length
                                    }
                                }
                            }
                        }
                    }

                    return {
                        branch_name: branch,
                        discount_claims: temp_discount,
                        freebies_claims: temp_freebies // or whatever default value you want for claims
                    }
                })
            )

            console.log(output)

            if (data.branch !== "") {
                output = output.filter(
                    (branch: any) => branch.branch_name === data.branch
                )
            }

            const labels = output.map((item) => item.branch_name)
            const discountClaims = output.map((item) => item.discount_claims)
            const freebiesClaims = output.map((item) => item.freebies_claims)

            return Response.json({
                labels,
                discountClaims,
                freebiesClaims
            })
        }

        // let brand_data = await Brand.findById(brand_id);
        // let branches = brand_data.branches
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
