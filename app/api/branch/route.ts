import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";

// Creates a new Branch
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
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")
        console.log("testtttttttttttttttttttttttttttt")

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

// Get Branches by BRAND_ID
export async function GET(req: NextRequest) { 
    const brand_id = req.nextUrl.searchParams.get('id') as string
    try {
        // Fetch all rewards from the database
        let brand_data = await Brand.findById(brand_id);
        let branches = brand_data.branches
        // Return the rewards as JSON response
        return Response.json({ branches })
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
  }
  
