import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards"
import Brand from "@/app/(models)/Brand";

export async function GET(req: NextRequest) { 
    const brandId = req.nextUrl.searchParams.get('id') as string;

    try {
       const rewards = await Rewards.find({brand_id: brandId});

       return NextResponse.json({
           status: 200,
           data: rewards
       });
    } catch (error) {
        console.error("Error while fetching rewards:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}