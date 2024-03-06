import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand";

export async function GET(req: NextRequest) { 
    const brandId = req.nextUrl.searchParams.get('id') as string;

    try {
       // Fetch the brand data using the provided brandId
       const brand = await Brand.findById(brandId);

       if (!brand) {
           return NextResponse.json({
               status: 404,
               message: "Brand not found",
           });
       }

       // You can fetch additional data related to the brand if needed

       return NextResponse.json({
           status: 200,
           data: brand,
       });
    } catch (error) {
        console.error("Error while fetching rewards:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}