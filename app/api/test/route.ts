// import User from "./model";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import { TagsHelper } from "@/app/(services)/tags_helper";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest, res: NextResponse) {
    const client_id = req.nextUrl.searchParams.get('clientid') as string
    const reward_id = req.nextUrl.searchParams.get('rewardid') as string
    const brand_id = req.nextUrl.searchParams.get('brandid') as string
    const data = await req.json();
      try {

        // TagsHelper(client_id, reward_id, "REWARD")

        TagsHelper(client_id, brand_id, "BRAND")

        return NextResponse.json({
            status: 200,
            message: "SUCCES:",
          });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}