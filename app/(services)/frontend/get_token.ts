import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";

export function getTokenContent(): any {
    const cookieStore = cookies();
    const token: any = cookieStore.get('token')?.value;

    // Decode the token to access its contents
    let tokenContents = null;
    if (token) {
        tokenContents = jwtDecode(token);
    }

    return tokenContents;
}
