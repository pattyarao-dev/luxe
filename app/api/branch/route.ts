import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";


export async function PATCH(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const brand_id = req.nextUrl.searchParams.get('id') as string
      try {
        
        let response = await Brand.updateOne(
            { _id: brand_id },
            {
                $push: {
                    branches: {
                        branch_name: data.branch_name,
                        location: {
                            type: 'Point',
                            coordinates: [data.longt, data.lat]
                        }
                    }
                }
            }
        );

        console.log(response)

        return NextResponse.json({
            status: 200,
            message: "SUCCES: BRANCH CREATED",
        });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}
