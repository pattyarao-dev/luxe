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

interface Output {
    claims: number
    sales: number //default 0
}

// GET
export async function POST(req: NextRequest) {
    const userid = req.nextUrl.searchParams.get("id") as string
    const data: ChartParameters = await req.json()

    try {
        // IF user_type == 'ADMIN_ALL' Get number of claims per Brand
        if (data.user_type === "ADMIN_ALL") {
            let output: Output
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

            // GET Rewards from Brand IDs
            const rewards = await Rewards.find({ brand_id: { $in: brand_ids } })

            if (data.start_date === "" && data.end_date === "") {
                console.log(rewards)
                output = rewards.reduce(
                    (acc: Output, reward) => {
                        acc.claims += reward.claim_count
                        acc.sales += reward.sales_total // Use 0 if sales_total is undefined
                        return acc
                    },
                    { claims: 0, sales: 0 }
                )

                return Response.json(output)
            } else {
                // Iterate thru each reward and get consolidated sales
                let consolidatedSalesDates: any[] = []

                for (let reward of rewards) {
                    // Get List of Bucket IDS
                    let bucket_ids = reward.claim_buckets

                    const formattedBucketIds = bucket_ids.map(
                        (bucketid: any) => {
                            return bucketid.toString()
                        }
                    )

                    let buckets = await Claim_Bucket.find({
                        _id: { $in: formattedBucketIds }
                    })

                    // Consolidate bucket transactions into one array

                    let consolidatedBucketTransactions = buckets.map(
                        (bucket: any) => {
                            return bucket.claims_transactions
                        }
                    )

                    for (let bucket_transaction of consolidatedBucketTransactions) {
                        consolidatedSalesDates.push(...bucket_transaction)
                    }
                }

                // APPLY DATE FILTERS

                let startDate = new Date(data.start_date)
                let endDate = new Date(data.end_date)

                let DateFilterFormattedconsolidatedSalesDates =
                    consolidatedSalesDates.filter((transaction: any) => {
                        let transactionDate = new Date(transaction.timestamp)
                        return (
                            transactionDate >= startDate &&
                            transactionDate <= endDate
                        )
                    })

                console.log(DateFilterFormattedconsolidatedSalesDates)
                output = DateFilterFormattedconsolidatedSalesDates.reduce(
                    (acc: Output, data) => {
                        acc.claims += 1
                        acc.sales += data.sales_value
                        return acc
                    },
                    { claims: 0, sales: 0 }
                )

                return Response.json(output)
            }
        }
        // IF user_type == 'ADMIN' Get number of claims per Branch
        else if (data.user_type === "ADMIN") {
            // Get User Data
            let output: Output
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

            if (data.start_date === "" && data.end_date === "") {
                console.log(rewards)
                output = rewards.reduce(
                    (acc: Output, reward) => {
                        acc.claims += reward.claim_count
                        acc.sales += reward.sales_total // Use 0 if sales_total is undefined
                        return acc
                    },
                    { claims: 0, sales: 0 }
                )

                return Response.json(output)
            } else {
                // Iterate thru each reward and get consolidated sales
                let consolidatedSalesDates: any[] = []

                for (let reward of rewards) {
                    // Get List of Bucket IDS
                    let bucket_ids = reward.claim_buckets

                    const formattedBucketIds = bucket_ids.map(
                        (bucketid: any) => {
                            return bucketid.toString()
                        }
                    )

                    let buckets = await Claim_Bucket.find({
                        _id: { $in: formattedBucketIds }
                    })

                    // Consolidate bucket transactions into one array

                    let consolidatedBucketTransactions = buckets.map(
                        (bucket: any) => {
                            return bucket.claims_transactions
                        }
                    )

                    for (let bucket_transaction of consolidatedBucketTransactions) {
                        consolidatedSalesDates.push(...bucket_transaction)
                    }
                }

                // APPLY DATE FILTERS

                let startDate = new Date(data.start_date)
                let endDate = new Date(data.end_date)

                let DateFilterFormattedconsolidatedSalesDates =
                    consolidatedSalesDates.filter((transaction: any) => {
                        let transactionDate = new Date(transaction.timestamp)
                        return (
                            transactionDate >= startDate &&
                            transactionDate <= endDate
                        )
                    })

                console.log(DateFilterFormattedconsolidatedSalesDates)
                output = DateFilterFormattedconsolidatedSalesDates.reduce(
                    (acc: Output, data) => {
                        acc.claims += 1
                        acc.sales += data.sales_value
                        return acc
                    },
                    { claims: 0, sales: 0 }
                )
                return Response.json(output)
            }
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
