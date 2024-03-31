import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards";

// Creates a new Branch
export async function PATCH(req: NextRequest, res: NextResponse) {
      try {
        
        let response = await Rewards.updateMany(
            {},{
                $set: {
                    img_url: "https://utfs.io/f/5ad07e90-45cd-4b15-a8f8-bd25943e70f5-9r1sm9.jpg", // Create a new field 'age'
                }
            }
        );

        console.log(response)

        return NextResponse.json({
            status: 200,
            message: "SUCCES: UPLOADED ALL IMAGES",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}

