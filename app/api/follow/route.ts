import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const brand_id = req.nextUrl.searchParams.get('brand') as string
  const client_id = req.nextUrl.searchParams.get('client') as string
      try {
        console.log(brand_id, client_id)

        let client_data = await User.findById(client_id)
        
        if(client_data.following_brands.includes(brand_id)){
            
            // UNFOLLOW

            // ADD BRAND_ID TO USER COLLECTION
            await User.updateOne({_id: client_id}, 
            {
                $inc: {total_follow_count: -1},
                $pull: { following_brands: brand_id}
            }
            )

            // GET CURRENT COUNT OF CURRENT BRAND COLLECTION AND DEDUCT ONE
            let current_brand_data = await Brand.findById(brand_id);
            let updated_fcount = current_brand_data.total_fcount - 1;

            // UPDATE BRAND COLLECTION
            // await Brand.updateOne(
            //     { _id: brand_id },
            //     {
            //         $inc: { 'follow_data.total_fcount': -1 },
            //         $push: {
            //                 'follow_data.fcount_audit': {
            //                 // date_counted: Date.now(),
            //                 fcount: updated_fcount
            //                 }
            //                 // ,
            //                 // 'follow_data.users_followedby': {
            //                 // date_followed: Date.now(),
            //                 // user_id: client_id,
            //                 // }
            //         }
            //     }
            // );


            await Brand.updateOne(
                { _id: brand_id },
                {
 
                    $inc: {total_fcount: -1 },
                    $push: {fcount_audit: {fcount: updated_fcount}}
                }
            );


            return NextResponse.json({
                status: 200,
                message: "SUCCES: UNFOLLOW",
            });
        }
        else {
            // FOLLOW

            // ADD BRAND_ID TO USER COLLECTION
            await User.updateOne({_id: client_id}, 
                {
                    $inc: {total_follow_count: 1},
                    $push: {following_brands: brand_id}
                }
                )
            
            // GET CURRENT COUNT OF CURRENT BRAND COLLECTION AND ADD ONE
            let current_brand_data = await Brand.findById(brand_id);
            let updated_fcount = current_brand_data.total_fcount + 1;

            // UPDATE BRAND COLLECTION
            // await Brand.updateOne(
            //         { _id: brand_id },
            //         {
            //             $inc: { 'follow_data.total_fcount': 1 },
            //             $push: {
            //                 'follow_data.fcount_audit': {
            //                     // date_counted: Date.now(),
            //                     fcount: updated_fcount
            //                 }
            //                 // ,
            //                 // 'follow_data.users_followedby': {
            //                 //     date_followed: Date.now(),
            //                 //     user_id: client_id,
            //                 // }
            //             }
            //         }
            // );

            await Brand.updateOne(
                { _id: brand_id },
                {
 
                    $inc: {total_fcount: 1 },
                    $push: {fcount_audit: {fcount: updated_fcount}}
                }
            );

            return NextResponse.json({
                status: 200,
                message: "SUCCES: FOLLOW",
            });
                
        }



        
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.log("err", err);
        return NextResponse.json({
          status: 500,
          message: err.message, // Return the error message
        });
      }
}
