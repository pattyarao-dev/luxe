import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import Brand from "@/app/(models)/Brand";

export async function GET(req: NextRequest) { 
    const client_id = req.nextUrl.searchParams.get('id') as string
    try {

        const client_data = await User.findById(client_id)
        // const following_brands = await Brand.find({ _id: { $in: client_data.following_brands } });
        const following_brands = await Promise.all(client_data.following_brands.map(async (brand: string, index: number) => {

            return await Brand.findById(brand)
        }))

        console.log(following_brands)
        return Response.json({ following_brands })
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching subscriptions:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
  }