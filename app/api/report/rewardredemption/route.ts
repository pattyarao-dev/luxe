import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand"
import Rewards from "@/app/(models)/Rewards"
import Claim_Bucket from "@/app/(models)/Claim_Bucket"
import { ClaimsPerBrandHelper } from "@/app/(services)/claims_per_brand_helper"

interface RewardData {
    reward_name: string;
    claims: number;
    cap: number;
}

interface BranchData {
    branch_name: string;
    reward_data: RewardData[];
}


// GET
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id") as string;
    const user_type = req.nextUrl.searchParams.get("usertype") as string;
    try {
        // Initialize output data
        let output : BranchData[] = []

        // GET Brand Associated
        let brand_data: any

        if(user_type === "ADMIN_ALL"){
            brand_data = await Brand.findById(id)
        }
        else if (user_type === "ADMIN"){
            let user_data : any = await User.findById(id);
            brand_data  = await Brand.findById(user_data.assigned_brand)
        }

        // Get List of branches 
        let branch_list = brand_data.branches.map((branch: any) => {
            return branch.branch_name
        })

        // Populate Branch Names of output 
        for(let branch of branch_list){
            output.push({branch_name: branch, reward_data: []})
        }

        // for each branch get the rewards and their claims and cap 

        for(let branch_data of output){

            let temp_rewards = await Rewards.find({ allowed_branches: branch_data.branch_name})

            for(let reward of temp_rewards){
                branch_data.reward_data.push({
                    reward_name: reward.reward_name,
                    claims: reward.claim_count,
                    cap: reward.cap
                })
            }
        }

        return Response.json({
            id: 1,
            date_created: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
            year: new Date().getFullYear().toString(),
            brand: brand_data.brand_name,
            branch_data: output})
        
        
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}