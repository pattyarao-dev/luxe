import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand"
import Rewards from "@/app/(models)/Rewards"
import Claim_Bucket from "@/app/(models)/Claim_Bucket"
import { ClaimsPerBrandHelper } from "@/app/(services)/claims_per_brand_helper"

interface BrandTransactions{
    brand_name: string
    transactions: any[]
}

interface BrandTransactions {
    brand_name: string;
    transactions: any[];
}

// GET
export async function GET(req: NextRequest) {
    const userid = req.nextUrl.searchParams.get("id") as string;
    const filter = req.nextUrl.searchParams.get("filter") as string;
    try {
        // GET Brands Associated
        let user_data = await User.findById(userid);

        // GET Brand IDs
        let brand_ids = user_data.brands;

        // GET Rewards from Brand IDs
        let brands: any = await Brand.find({ _id: { $in: brand_ids } });

        let transactions_per_brand: BrandTransactions[] = [];

        // For each brand, get the reward and their corresponding transactions
        for (let brand of brands) {
            let brand_name = brand.brand_name;
            let transactions: any[] = [];

            // Get the rewards from brand
            let temp_rewards = await Rewards.find({ brand_id: brand._id });

            // Get the transactions for all rewards from buckets
            for (let reward of temp_rewards) {
                // Get Buckets
                for (let bucket_id of reward.claim_buckets) {
                    // find bucket_id
                    let bucket_content = await Claim_Bucket.findById(bucket_id);
                    transactions.push(...bucket_content.claims_transactions);
                }
            }

            // Append brand_name and transactions to transactions_per_brand array
            transactions_per_brand.push({ brand_name, transactions });
        }
        
        
        let output : any = ClaimsPerBrandHelper(transactions_per_brand!)



        if (filter === "firstsix") {
            let filteredData = output.monthly_data.slice(0, 6);
            return Response.json({
                id: 1,
                date_created: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                year: new Date().getFullYear().toString(),
                monthly_data: filteredData});
        } else if (filter === "lastsix") {
            let filteredData = output.monthly_data.slice(6);
            return Response.json({
                id: 1,
                date_created: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                year: new Date().getFullYear().toString(),
                monthly_data: filteredData});
        } 

        
        
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}