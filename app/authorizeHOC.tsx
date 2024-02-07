// Import necessary modules
"use client"
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // Changed import to useRouter

// Define the type for cookie information
type CookieInfoType = {
  _id: string,
  user_type: string;
};

// Define the higher-order component
export default function authorizedComponent<P>(
  WrappedComponent: React.ComponentType<P & CookieInfoType>, // Component with added props
  allowedUserTypes: string[]
) {
  return function AuthorizedComponent(props: P) {
    // const router = useRouter(); // Use useRouter directly within the functional component
    const [tokenAuth, setTokenAuth] = useState<string | undefined>(undefined);

    useEffect(() => {
      const fetchTokenFromAPI = async () => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/token");
          if (response.ok) {
            const data = await response.json();
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

    console.log(tokenAuth)

    if (tokenAuth) {
      const user_jwt: any = jwtDecode(tokenAuth);

      if (allowedUserTypes.includes(user_jwt.user_type)){
        // Pass additional props to the wrapped component
        return <WrappedComponent {...props} _id={user_jwt.user_type} user_type={user_jwt._id} />;
      }
      else{
        console.log('Not Authorized')
        // router.push('/login');
        return null; // Return null as component won't render if not authorized
      }
    } else {
      console.log('Token not found');
      // router.push('/login');
      return null; // Return null as component won't render if token not found
    }
  };
}


//Source: https://maxrozen.com/implement-higher-order-component-react-typescript 
