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
