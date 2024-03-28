import { NextRequest, NextResponse } from "next/server"
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand"
import Rewards from "@/app/(models)/Rewards"
import Claim_Bucket from "@/app/(models)/Claim_Bucket"
import { DateGrouper } from "@/app/(services)/date_grouper"

interface ChartParameters {
    user_type: string
    brand: string
    branch: string
    start_date: string
    end_date: string
}

interface Output {
    [key: string]: number
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

            // APPLY BRAND FILTER IF EXISTS
            if (data.brand !== "") {
                console.log("here")
                brand_ids = brand_ids.filter(
                    (brand_id: string) => brand_id.toString() === data.brand
                )
            }

            // GET Rewards from Brand IDs
            const rewards = await Rewards.find({ brand_id: { $in: brand_ids } })

            // Iterate thru each reward and get consolidated sales
            let consolidatedSalesDates: any[] = []

            for (let reward of rewards) {
                // Get List of Bucket IDS
                let bucket_ids = reward.claim_buckets

                const formattedBucketIds = bucket_ids.map((bucketid: any) => {
                    return bucketid.toString()
                })

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

            const formattedconsolidatedSalesDates = consolidatedSalesDates.map(
                (transaction: any) => {
                    return transaction.timestamp
                }
            )

            // APPLY DATE FILTERS IF ANY
            if (data.start_date !== "" && data.end_date !== "") {
                // IF THERE ARE SPECIFIED DATE FILTERS
                let startDate = new Date(data.start_date)
                let endDate = new Date(data.end_date)

                let DateFilterFormattedconsolidatedSalesDates =
                    formattedconsolidatedSalesDates.filter(
                        (transaction: any) => {
                            let transactionDate = new Date(transaction)
                            return (
                                transactionDate >= startDate &&
                                transactionDate <= endDate
                            )
                        }
                    )
                output = DateGrouper(DateFilterFormattedconsolidatedSalesDates)

                // Sort By Date
                const sortedKeys = Object.keys(output).sort((a, b) => {
                    const weekNumA = parseInt(a.split("Week")[1])
                    const weekNumB = parseInt(b.split("Week")[1])
                    return weekNumA - weekNumB
                })

                const sortedData: { [key: string]: number } = {}
                sortedKeys.forEach((key) => {
                    sortedData[key] = output[key]
                })

                const labels = Object.keys(sortedData)
                const claims = Object.values(sortedData)

                return Response.json({ labels, claims })
            } else {
                output = DateGrouper(formattedconsolidatedSalesDates)

                const sortedKeys = Object.keys(output).sort((a, b) => {
                    const weekNumA = parseInt(a.split("Week")[1])
                    const weekNumB = parseInt(b.split("Week")[1])
                    return weekNumA - weekNumB
                })

                const sortedData: { [key: string]: number } = {}
                sortedKeys.forEach((key) => {
                    sortedData[key] = output[key]
                })

                const labels = Object.keys(sortedData)
                const claims = Object.values(sortedData)

                return Response.json({ labels, claims })
            }
        }
        // IF user_type == 'ADMIN' Get number of claims per Branch
        else if (data.user_type === "ADMIN") {
            // Set Output Object
            let output: Output

            // Get User Data
            let user_data = await User.findById(userid)

            // BRAND ID
            let brandid: string = user_data.assigned_brand.toString()

            // GET Rewards from Brand ID
            let rewards = await Rewards.find({ brand_id: brandid })

            // APPLY BRANCH FILTER IF EXISTS
            if (data.branch !== "") {
                console.log("here")
                rewards = rewards.filter((reward: any) =>
                    reward.allowed_branches.includes(data.branch)
                )
            }

            // Iterate thru each reward and get consolidated sales
            let consolidatedSalesDates: any[] = []

            for (let reward of rewards) {
                // Get List of Bucket IDS
                let bucket_ids = reward.claim_buckets

                const formattedBucketIds = bucket_ids.map((bucketid: any) => {
                    return bucketid.toString()
                })

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

            const formattedconsolidatedSalesDates = consolidatedSalesDates.map(
                (transaction: any) => {
                    return transaction.timestamp
                }
            )

            // APPLY DATE FILTERS IF ANY
            if (data.start_date !== "" && data.end_date !== "") {
                // IF THERE ARE SPECIFIED DATE FILTERS
                let startDate = new Date(data.start_date)
                let endDate = new Date(data.end_date)

                let DateFilterFormattedconsolidatedSalesDates =
                    formattedconsolidatedSalesDates.filter(
                        (transaction: any) => {
                            let transactionDate = new Date(transaction)
                            return (
                                transactionDate >= startDate &&
                                transactionDate <= endDate
                            )
                        }
                    )
                output = DateGrouper(DateFilterFormattedconsolidatedSalesDates)
                // Sort By Date
                const sortedKeys = Object.keys(output).sort((a, b) => {
                    const weekNumA = parseInt(a.split("Week")[1])
                    const weekNumB = parseInt(b.split("Week")[1])
                    return weekNumA - weekNumB
                })

                const sortedData: { [key: string]: number } = {}
                sortedKeys.forEach((key) => {
                    sortedData[key] = output[key]
                })

                const labels = Object.keys(sortedData)
                const claims = Object.values(sortedData)

                return Response.json({ labels, claims })
            } else {
                output = DateGrouper(formattedconsolidatedSalesDates)
                // Sort By Date
                const sortedKeys = Object.keys(output).sort((a, b) => {
                    const weekNumA = parseInt(a.split("Week")[1])
                    const weekNumB = parseInt(b.split("Week")[1])
                    return weekNumA - weekNumB
                })

                const sortedData: { [key: string]: number } = {}
                sortedKeys.forEach((key) => {
                    sortedData[key] = output[key]
                })

                const labels = Object.keys(sortedData)
                const claims = Object.values(sortedData)

                return Response.json({ labels, claims })
            }
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
