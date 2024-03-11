import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import Notification from "@/app/(models)/Notification";

export async function GET(req: NextRequest) { 
    const client_id = req.nextUrl.searchParams.get('id') as string
    try {

        const client_data = await User.findById(client_id)

        if(!client_data){
            return NextResponse.json({
                status: 404,
                message: "User not found!"
            });
        }

        console.log(client_data.user_type)

        if(client_data.user_type === "ADMIN"){
            const notifications = await Notification.find({ sender: client_data.assigned_brand });
            return Response.json({ notifications })
        }
        else if (client_data.user_type === "ADMIN_ALL"){

           let brand_ids: string[] = []

           for (let i = 0; i < client_data.brands.length; i++) {
            brand_ids.push(client_data.brands[i].toString())
           }

           console.log(brand_ids)

            const notifications = await Notification.find({ sender: { $in: brand_ids } });
            return Response.json({ notifications })
        }
        else{
            return NextResponse.json({
                status: 500,
                message: "User Not Authorized to Retrieve Notifications",
            });
        }

        
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching notifications:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
  }