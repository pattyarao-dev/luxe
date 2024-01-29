// import User from "./model";

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/(models)/User";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    let response = await User.create(data)
    console.log(response)
    return NextResponse.json({
        status: 200,
        message: "Success",
      });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({
        status: 500,
        message: err,
      });
  }
}
