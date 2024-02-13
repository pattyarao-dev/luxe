import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import Rewards from "@/app/(models)/Rewards";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const reward_id = req.nextUrl.searchParams.get('reward') as string
  const client_id = req.nextUrl.searchParams.get('client') as string
      try {

        let client_data = await User.findById(client_id)
        let reward_data = await Rewards.findById(reward_id)

        // VERIFY IF CLIENT AND REWARD EXISTS
        if (!client_data || !reward_data){
            
            console.log("Invalid User or Reward");
            throw new Error("Invalid User or Reward");
        }

        // ADD TO SAVED_REWARDS
        await User.updateOne({_id: client_id}, 
            {
                $push: { saved_rewards: reward_id}
            }
            )

        
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.log("err", err);
        return NextResponse.json({
          status: 500,
          message: err.message, // Return the error message
        });
      }
}