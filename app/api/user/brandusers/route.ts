import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";

export async function GET(req: NextRequest) { 
    const brandId = req.nextUrl.searchParams.get('id') as string;

    try {
       const users = await User.find({assigned_brand: brandId});

       return NextResponse.json({
           status: 200,
           data: users
       });
    } catch (error) {
        console.error("Error while fetching rewards:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}