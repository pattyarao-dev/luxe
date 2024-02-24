import { HomeRewards } from '@/components/pages/homepage/homeRewards'
import Header from '@/components/reusable/header'
import SearchBar from '@/components/reusable/searchbar'
import React from 'react'
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode"; // Import jwt-decode


export default function Home() {
  const cookieStore = cookies()
  const token : any = cookieStore.get('token')?.value
    // Decode the token to access its contents
  let tokenContents = null;
    if (token) {
      tokenContents = jwtDecode(token);
      console.log('Decoded Token Contents:', tokenContents);
    }
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start gap-10">
        <div className="z-40 top-0 sticky w-full flex flex-col gap-3 bg-white pb-8">
          <Header/>
          <SearchBar/>
        </div>
        <HomeRewards/>
    </main>
        

  )
}