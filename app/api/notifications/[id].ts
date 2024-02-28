import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {

    try {

        // Return the rewards as JSON response
        return Response.json({ })
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}