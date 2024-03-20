import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards";

export async function GET(req: NextRequest) {
    const reward_id = req.nextUrl.searchParams.get('id') as string
    try {
      console.log()
      const reward = await Rewards.findById(reward_id);
      return Response.json({ reward })
    } catch (error) {
      console.log(error)
      return Response.json({
        status: 500,
        message: (error as Error).message,
      });
    }
    
  }
  