import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Brand from "@/app/(models)/Brand"
import User from "@/app/(models)/User"

// Get Branches by USER_ID
export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.get("id") as string
    try {
        console.log(user_id)
        let user_data: any = await User.findById(user_id)

        if (!user_data) {
            throw Error("User Not Found")
        }

        console.log(user_data)

        if (user_data.user_type !== "ADMIN_ALL") {
            throw Error("User Type Error: Access Denied")
        }

        let brands = await Brand.find({ _id: { $in: user_data.brands } })

        return Response.json(brands)
    } catch (err: any) {
        // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
