import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const admin_all_id = req.nextUrl.searchParams.get('id') as string
      try {

        let brand_create = await Brand.create(data)
        const brand_id : string =  brand_create._id.toString()
        
        let response = await User.updateOne({_id: admin_all_id}, 
            { $push: { brands: brand_id } })

        return NextResponse.json({
            status: 200,
            message: "SUCCES: BRAND CREATED",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}

export async function GET(req: NextRequest) { 
  const brand_id = req.nextUrl.searchParams.get('id') as string
  try {
      // Fetch all rewards from the database
      let brand_data = await Brand.findById(brand_id);
      let branches = brand_data.branches
      // Return the rewards as JSON response
      return Response.json({ branches })
  } catch (err: any) { // Explicitly specify the type of err as any or Error
      console.error("Error while fetching rewards:", err);
      return NextResponse.json({
          status: 500,
          message: "Internal Server Error",
      });
  }
}
