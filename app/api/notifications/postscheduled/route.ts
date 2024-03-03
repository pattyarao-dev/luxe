import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Notification from "@/app/(models)/Notification";
import { DateChecker } from "@/app/(services)/date_checker";

// Creates a new Branch
export async function PATCH(req: NextRequest, res: NextResponse) {
      try {
        
        const all_notifs = await Notification.find({
            is_scheduled: true
        })

        if(all_notifs.length === 0){
            return NextResponse.json({
                status: 200,
                message: "STATUS: NO SCHEDULED NOTIFICATIONS",
            });
        }

        for (const element of all_notifs) {
            console.log(DateChecker(element.scheduled_post_date))
            if (DateChecker(element.scheduled_post_date)) {
                await Notification.updateOne({ _id: element._id }, {
                    is_scheduled: false,
                    date_posted: new Date().toString()
                });
            }
        }

        return NextResponse.json({
            status: 200,
            message: "SUCCESS: NOTIFICATIONS POSTED",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}