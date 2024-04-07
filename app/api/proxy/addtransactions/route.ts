import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import Claim_Bucket from "@/app/(models)/Claim_Bucket";

// Creates a new Branch
export async function PATCH(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const bucket_id = req.nextUrl.searchParams.get('id') as string

    // GET BRAND_BUCKET ID

      try {
        
        let response = await Claim_Bucket.updateOne(
            { _id: bucket_id },
            { $push: { claims_transactions: { $each: data.transacs} } }
        );

        console.log(response)

        return NextResponse.json({
            status: 200,
            message: "SUCCES: TRANSACTIONS CREATED",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}

  
