import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Claim_Transaction from "@/app/(models)/Claim_Transaction"
import Rewards from "@/app/(models)/Rewards"
import User from "@/app/(models)/User"
import { checkIfClaimedRewardByID } from "@/app/(services)/claimed_reward_checker"

// GET CLAIMED REWARDS
export async function GET(req: NextRequest) {
    const userid = req.nextUrl.searchParams.get("id") as string

    try {
        const claimed_transactions = await Claim_Transaction.find({claimed_by: userid})

        // GET reward ids from claimed_transactions
        let reward_ids = claimed_transactions.map((reward: any) => {
            return reward.reward
        })

        let claimed_rewards = await Rewards.find({_id: { $in: reward_ids }})

        return Response.json({ claimed_rewards })
    } catch (error) {
        return Response.json({
            status: 500,
            message: (error as Error).message
        })
    }
}
