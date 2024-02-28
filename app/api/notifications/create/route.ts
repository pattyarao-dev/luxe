import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

// CREATE A NOTIFICATION BY BRAND ID
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const brand_id = req.nextUrl.searchParams.get('id') as string
      try {

        let brand_data = await Brand.findById(brand_id)

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

