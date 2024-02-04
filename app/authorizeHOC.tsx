import React, { useState } from 'react';
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/router';


// First we need to add a type to let us extend the incoming component.
type CookieInfoType = {
  _id: string,
  user_type: string;
};

const router = useRouter();

// Mark the function as a generic using P (or whatever variable you want)
export default function authorizedComponent<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P & CookieInfoType>,
  allowedUserTypes: string[]
) {
  const [extraInfo, setExtraInfo] = useState('');
  setExtraInfo('important data.');

  const token_auth: string | undefined = cookies().get('token')?.value;

  if (token_auth) {
    const user_jwt: any = jwtDecode(token_auth);

    if (allowedUserTypes.includes(user_jwt.user_type)){
      // Your Code here
      const authorizedComponentWithInfo = (props: P) => {
        // At this point, the props being passed in are the original props the component expects.
        return <WrappedComponent {...props} _id={user_jwt.user_type} user_type={user_jwt._id}/>;
      };
      
      return authorizedComponentWithInfo;
    }
    else{
      console.log('Not Authorized')
      router.push('/unauthorized-page');
      return;
    }
    // Now you can use user_jwt safely
  } else {
    // Handle the case where token_auth is undefined
    console.log('Token not found');
    router.push('/unauthorized-page');
    return;
  }

}


//Source: https://maxrozen.com/implement-higher-order-component-react-typescript 
