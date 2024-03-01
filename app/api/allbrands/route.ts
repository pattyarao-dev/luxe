import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User"
import Brand from "@/app/(models)/Brand";

// Get Branches by BRAND_ID
export async function GET(req: NextRequest) { 
    const userType = req.nextUrl.searchParams.get('userType') as string;
    const userId = req.nextUrl.searchParams.get('id') as string;

    try {
        if (userType === "ADMIN_ALL") {
            // Fetch all brands
            const brands = await Brand.find();
            // Store brands data to an object and return
            return NextResponse.json({ brands });
        } else {
            // Assuming you have a User model and it has assignedBrandIds array
            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({
                    status: 404,
                    message: "User not found!"
                });
            }

            // Fetch assigned brands using brand IDs from user object
            const brands = await Brand.find({ _id: { $in: user.assigned_brand } });
            // Store brands data to an object and return
            return NextResponse.json({ brands });
        }
    } catch (error) {
        console.error("Error while fetching rewards:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}