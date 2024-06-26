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

interface HorizBarAdminAll {
    brand_id: string
    brand_name: string
    claims: number //default 0
}

interface HorizBarAdmin {
    branch_name: string
    claims: number //default 0
}

interface ResponseObject {
    labels: string[]
    data: number[]
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
                brands = brands.filter(
                    (brand: any) => brand._id.toString() === data.brand
                )
            }

            output = await Promise.all(
                brands.map(async (brand: any) => {
                    // For each BRAND ID...

                    // Get the rewards associated with the brand
                    let temp_rewards = await Rewards.find({
                        brand_id: brand._id.toString()
                    })

                    let claim_value: number = await temp_rewards.reduce(
                        async (totalCountPromise : any, reward : any) => {
                            let totalCount = await totalCountPromise
                            let count: number = 0

                            for (let bucketid of reward.claim_buckets) {
                                let temp_bucket_id: string = bucketid.toString()

                                // Assuming Claim_Bucket.findById returns a promise
                                let bucket_content =
                                    await Claim_Bucket.findById(temp_bucket_id)

                                // Aggregate claims based on filters (DATE FILTERS)

                                // IF start_date and end_date is empty
                                if (
                                    data.start_date === "" ||
                                    data.end_date === ""
                                ) {
                                    count += bucket_content.bucket_claim_count
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

                                    count += filteredTransactions.length
                                }
                            }

                            return totalCount + count
                        },
                        Promise.resolve(0)
                    )

                    return {
                        brand_id: brand._id,
                        brand_name: brand.brand_name,
                        claims: claim_value // or whatever default value you want for claims
                    }
                })
            )

            // Sort By Descending Order
            const sortedBrandsData = output.sort((a, b) => b.claims - a.claims)

            const topFiveBrands = sortedBrandsData.slice(0, 5);

            // Format as Horizontal Bar (Chart.js) format
            const labels: string[] = topFiveBrands.map(
                (brand) => brand.brand_name
            )
            const claims: number[] = topFiveBrands.map(
                (brand) => brand.claims
            )

            return Response.json({ labels, claims })
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
                rewards = rewards.filter((reward: any) =>
                    reward.allowed_branches.includes(data.branch)
                )
            }

            // For each branch, check if each reward is allowed to be redeemed in that reward
            output = await Promise.all(
                branches.map(async (branch: string) => {
                    let claim_value: number = await rewards.reduce(
                        async (totalCountPromise : any, reward : any) => {
                            let totalCount = await totalCountPromise
                            let count: number = 0

                            // Check if the branch (i) matches with the allowed branches in reward (j)

                            if (reward.allowed_branches.includes(branch)) {
                                for (let bucketid of reward.claim_buckets) {
                                    let temp_bucket_id: string =
                                        bucketid.toString()

                                    // Assuming Claim_Bucket.findById returns a promise
                                    let bucket_content =
                                        await Claim_Bucket.findById(
                                            temp_bucket_id
                                        )

                                    // Aggregate claims based on filters (DATE FILTERS)

                                    // IF start_date and end_date is empty
                                    if (
                                        data.start_date === "" ||
                                        data.end_date === ""
                                    ) {
                                        count +=
                                            bucket_content.bucket_claim_count
                                    } else {
                                        // IF THERE ARE SPECIFIED DATE FILTERS
                                        let startDate = new Date(
                                            data.start_date
                                        )
                                        let endDate = new Date(data.end_date)

                                        let filteredTransactions =
                                            bucket_content.claims_transactions.filter(
                                                (transaction: any) => {
                                                    let transactionDate =
                                                        new Date(
                                                            transaction.timestamp
                                                        )
                                                    return (
                                                        transactionDate >=
                                                            startDate &&
                                                        transactionDate <=
                                                            endDate
                                                    )
                                                }
                                            )

                                        count += filteredTransactions.length
                                    }
                                }
                            }

                            return totalCount + count
                        },
                        Promise.resolve(0)
                    )

                    return {
                        branch_name: branch,
                        claims: claim_value // or whatever default value you want for claims
                    }
                })
            )

            // Sort By Descending Order
            let sortedBrandsData = output.sort((a, b) => b.claims - a.claims)

            // Filter out other branches
            if (data.branch !== "") {
                sortedBrandsData = sortedBrandsData.filter(
                    (branch: any) => branch.branch_name === data.branch
                )
            }

            const topFiveBranch = sortedBrandsData.slice(0, 5);

            // Format as Horizontal Bar (Chart.js) format
            const labels: string[] = topFiveBranch.map(
                (brand) => brand.branch_name
            )
            const claims: number[] = topFiveBranch.map(
                (brand) => brand.claims
            )

            return Response.json({ labels, claims })
        }
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
