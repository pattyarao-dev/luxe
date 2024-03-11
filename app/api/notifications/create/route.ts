import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";
import Notification from "@/app/(models)/Notification";
import { DateChecker } from "@/app/(services)/date_checker";

// CREATE A NOTIFICATION BY BRAND ID
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const brand_id = req.nextUrl.searchParams.get('id') as string
      try {

        let brand_data = await Brand.findById(brand_id)
        if (!brand_data) {
          console.log("Brand not found")
          throw new Error("Brand not found");
        }

        let brand_followers = await User.find({
          following_brands: { $all: [brand_id.toString()] }
        })

        const array_of_client_ids = brand_followers.map(user => user._id);
        const formatted_array_of_client_ids = array_of_client_ids.map(client => client.toString());

        let is_scheduled_val : boolean = false

        if(data.scheduled_post_date.length > 0){
          is_scheduled_val = true

          //CHECK IF THE SCHEDULED POSTED DATE IS VALID
          if(DateChecker(data.scheduled_post_date)){
            console.log("Invalid Date")
            throw new Error("Invalid Date");
          }
        }


        const input_data = {
          ...data,
          receiver: formatted_array_of_client_ids, 
          sender: brand_id,
          is_scheduled: is_scheduled_val
        }

        console.log(input_data)

        let notif_create = await Notification.create(input_data)
        

        return NextResponse.json({
            status: 200,
            message: "SUCCESS: Notification Created",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}

