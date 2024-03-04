import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Notification from "@/app/(models)/Notification";
import mongoose from 'mongoose';


  export async function PATCH(req: NextRequest, res: NextResponse) {
    const client_id = req.nextUrl.searchParams.get('client') as string
    const notif_id = req.nextUrl.searchParams.get('notif') as string

    try {
      
        const notif_data = await Notification.findById(notif_id)

        if(!notif_data){
            console.log("Notification not Found")
            throw new Error("Notification not Found");
        }

        if(notif_data.read_by.includes(client_id)){
            return NextResponse.json({
                status: 200,
                message: "STATUS: CLIENT ALREADY VIEWED NOTIFICATION",
            });
        }
        else {
            await Notification.updateOne({ _id: notif_id }, {
                $push: { read_by: client_id }, 
                $inc: {clicks: 1}
            });
        }


      return NextResponse.json({
          status: 200,
          message: "SUCCESS: CLIENT VIEWED NOTIFICATION",
      });
      
    } catch (err) {
      console.log("err", err);
      return NextResponse.json({
          status: 500,
          message: err,
        });
    }
}