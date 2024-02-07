import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';
import { PERMISSIONS } from './PERMISSIONS';

export function middleware(req: NextRequest) {
    
    const { pathname }: { pathname: string } = req.nextUrl;
    const tokenAuth = req.cookies.get('token')?.value;
    const user_type = (<any>jwtDecode(tokenAuth!)).user_type


    const login_url = req.nextUrl.clone()
    login_url.pathname = '/login'

    if(PERMISSIONS[user_type].includes(pathname)){
        return NextResponse.next()
    }
    else {
        return NextResponse.redirect(login_url)
    }
}
 
export const config = {
    matcher: [
        '/home', 
        '/'
    ]
  }