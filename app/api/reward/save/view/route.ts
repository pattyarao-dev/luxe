import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import Rewards from "@/app/(models)/Rewards";

export async function GET(req: NextRequest) { 
    const client_id = req.nextUrl.searchParams.get('id') as string
    try {

        const client_data = await User.findById(client_id)
        const saved_rewards = await Rewards.find({ _id: { $in: client_data.saved_rewards } });

        return Response.json({ saved_rewards })
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching notifications:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
  }