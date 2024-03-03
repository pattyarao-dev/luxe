import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Notification from "@/app/(models)/Notification";

export async function GET(req: NextRequest) { 
    const client_id = req.nextUrl.searchParams.get('id') as string
    try {
        const notifs = await Notification.find({
        receiver: { $all: [client_id] }, 
        is_scheduled: false})

        return Response.json({ notifs })
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching notifications:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
  }