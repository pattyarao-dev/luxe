import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

// CREATE A NEW BRAND
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

