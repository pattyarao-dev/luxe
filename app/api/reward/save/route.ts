import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import Rewards from "@/app/(models)/Rewards";
import { TagsHelper } from "@/app/(services)/tags_helper";

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

        // CHECK IF REWARD IS ALREADY SAVED
        if (client_data.saved_rewards.includes(reward_id)){

        // REMOVE TO SAVED_REWARDS
        await User.updateOne({_id: client_id}, 
          {
              $pull: { saved_rewards: reward_id}
          }
          )

          return NextResponse.json({
            status: 200,
            message: "SUCCESS: REWARD REMOVED FROM SAVED REWARDS",
        });
        
        }

        // ADD TO SAVED_REWARDS
        await User.updateOne({_id: client_id}, 
            {
                $push: { saved_rewards: reward_id}
            }
            )

            TagsHelper(client_id, reward_id, "REWARD")
      
            return NextResponse.json({
              status: 200,
              message: "SUCCESS: REWARD SAVED",
          });
          
        
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.log("err", err);
        return NextResponse.json({
          status: 500,
          message: err.message, // Return the error message
        });
      }
}
