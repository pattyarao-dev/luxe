import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Tag from "@/app/(models)/Tag";


export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
        try {
            
            let tag_create = await Tag.create(data)
            
            console.log(data)
    
            return NextResponse.json({
                status: 200,
                message: "SUCCES: TAG CREATED",
            });
          
        } catch (err: any) { // Explicitly specify the type of err as any or Error
          console.log("err", err);
          return NextResponse.json({
            status: 500,
            message: err.message, // Return the error message
          });
        }
  }

  export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Fetch all rewards from the database
        const tags = await Tag.find();
        const tagNames = tags.map(tag => tag.tag_name);
        // Return the rewards as JSON response
        return NextResponse.json({
            status: 200,
            data: tagNames,
        });
    } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.error("Error while fetching rewards:", err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}
