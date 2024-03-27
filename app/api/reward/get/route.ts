import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards";
import User from "@/app/(models)/User";
import { checkIfClaimedRewardByID } from "@/app/(services)/claimed_reward_checker";

export async function GET(req: NextRequest) {
    const reward_id = req.nextUrl.searchParams.get('rewardid') as string
    const client_id = req.nextUrl.searchParams.get('clientid') as string
    const cashier_id = req.nextUrl.searchParams.get('cashierid') as string
    try {
      const reward = await Rewards.findById(reward_id);

      if (!reward) {
        throw new Error("Reward not found");
      }

      if(await checkIfClaimedRewardByID(client_id, reward_id)){
        throw new Error("Client already has claimed this reward");
      }


    // CHECK IF CASHIER TYPE IS VALID 
    let cashier_data = await User.findById(cashier_id)
    if(cashier_data.user_type !== 'CASHIER'){
        throw new Error("Not a valid User Type. Must be a CASHIER");
    }

    // CHECK IF CASHIER IS UNDER THE SAME BRAND 
    if(cashier_data.assigned_brand.toString() !== reward.brand_id.toString()){
        throw new Error("Not a valid User. Mismatch of Brans Assignment");
    }

    // CHECK IF THE REWARD IS ACCEPTED BY THE CASHIER'S BRANCH
    if(!reward.allowed_branches.includes(cashier_data.assigned_branch)){
        throw new Error("Reward not Offered in this Branch");
    }

    // CHECK IF REWARD IS ALREADY EXPIRED 
    if(reward.is_expired){
        throw new Error("Reward has expired");
    }

    return Response.json({ reward })
    } catch (error) {
      return Response.json({
        status: 500,
        message: (error as Error).message,
      });
    }
    
  }
  