import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/app/(models)/User";
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email });
    console.log(user)
    if (user) {

      // Check if password matches
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        
        // Generate JWT token
        const token = jwt.sign({ _id: user._id, user_type: user.user_type }, "your_secret_key_here");

        // Generate Cookie
        // https://stackoverflow.com/questions/76546264/how-to-set-cookie-using-nextresponse-at-server-side
        // const cookieStore = cookies();
        // cookieStore.set('token', token, {
        //   httpOnly: true
        // });

        const seralized = serialize("token", token, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        // return new Response(JSON.stringify({ token }), {
        //   status: 200,
        //   headers: { 'auth-jwt': `auth-jwt=${token}`},
        // });

        const response = {
          message: "Authenticated!",
        };
      
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { "Set-Cookie": seralized },
        });

      } else {
        return NextResponse.json({
          status: 500,
          message: "Invalid Password",
        });
      }
    } else {
      return NextResponse.json({
        status: 500,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: (error as Error).message,
    });
  }
}