// import User from "./model";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
      try {
        //Password Hasshing
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Insert Document
        let response = await User.create(data)
        console.log("USER CREATED: ", response)
        return NextResponse.json({
            status: 200,
            message: "SUCCES: USER CREATED",
          });
        
      } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            status: 500,
            message: err,
          });
      }
}

export async function GET(req: NextRequest) {
  try {
    const data = await req.body;
    console.log(data)
    // console.log(_id)
    // const user = await User.findOne({ _id: _id });
    return Response.json({ data })
    
  } catch (error) {
    console.log(error)
    return Response.json({
      status: 500,
      message: (error as Error).message,
    });
  }
  
}

