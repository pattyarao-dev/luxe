import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const seralized = serialize("token", '', {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });


      const response = {
        message: "Logged Out!",
      };
    
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": seralized },
      });   
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: (error as Error).message,
    });
  }
}