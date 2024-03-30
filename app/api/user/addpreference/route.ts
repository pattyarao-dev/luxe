// import User from "./model";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";

export async function PATCH(req: NextRequest, res: NextResponse) {
    const client_id = req.nextUrl.searchParams.get('id') as string
    const data = await req.json();
      try {
        // check if user exists 

        const user_data = await User.findById(client_id)

        if(!user_data){
            throw Error("User not Found")
        }

        await User.updateOne({_id: client_id}, 
            {
                $push: { preference_tags: data.preference_tags}
            }
            )

        return NextResponse.json({
            status: 200,
            message: "SUCCES: ADDED PREFERENCES",
          });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}


