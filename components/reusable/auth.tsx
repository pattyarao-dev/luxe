"use client"
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

interface AuthProps {
    allowedUserTypes: string[];
    pageName: string
}
  
const AuthorizedUsers: React.FC<AuthProps> = ({ allowedUserTypes, pageName }) => {
    const router = useRouter(); 
    const [tokenAuth, setTokenAuth] = useState<string>('');

    useEffect(() => {
      const fetchTokenFromAPI = async () => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/token");
          if (response.ok) {
            const data = await response.json();
            console.log("Response: ", data)
            setTokenAuth(data);
          } else {
            console.error('Failed to fetch token:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };

      fetchTokenFromAPI();
    }, []); // Run this effect only once, when the component mounts


    if (tokenAuth) {
        const user_jwt: any = jwtDecode(tokenAuth);
        console.log(user_jwt)
  
        if (allowedUserTypes.includes(user_jwt.user_type)){
          // Pass additional props to the wrapped component
            return;
        }
        else{
          console.log('Not Authorized');
          router.push("/login");
          return null; // Return null as component won't render if not authorized
        }
      } else {
        console.log('Token not found');
        router.push("/login");
        return null; // Return null as component won't render if token not found
      }
    };

  
export default AuthorizedUsers;