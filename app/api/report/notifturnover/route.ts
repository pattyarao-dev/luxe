import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand"
import Rewards from "@/app/(models)/Rewards"
import Claim_Bucket from "@/app/(models)/Claim_Bucket"
import { ClaimsPerBrandHelper } from "@/app/(services)/claims_per_brand_helper"
import Notification from "@/app/(models)/Notification"

interface RewardData {
    reward_name: string;
    claims: number;
    total_clicks: number;
}



// GET
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id") as string;
    const user_type = req.nextUrl.searchParams.get("usertype") as string;
    try {
        // Initialize output data
        let output : RewardData[] = []

        // GET Brand Associated
        let brand_data: any

        if(user_type === "ADMIN_ALL"){
            brand_data = await Brand.findById(id)
        }
        else if (user_type === "ADMIN"){
            let user_data : any = await User.findById(id);
            brand_data  = await Brand.findById(user_data.assigned_brand)
        }


            let rewards = await Rewards.find({ brand_id: brand_data._id.toString()})

            for(let reward of rewards){

                //Get notifications if any 
                let temp_clicks : any = 0
                let notifs = await Notification.find({reward: reward._id.toString()})

                if(notifs){
                    console.log("may notifs pre")
                    for(let notif of notifs){
                        temp_clicks += notif.clicks
                    }
                }
                
                output.push({
                    reward_name: reward.reward_name,
                    claims: reward.claim_count,
                    total_clicks: temp_clicks
                })
            }
        

        return Response.json({
            id: 1,
            date_created: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
            year: new Date().getFullYear().toString(),
            brand: brand_data.brand_name,
            reward_data: output})
        
        
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}