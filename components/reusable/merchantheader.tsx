'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"

export default function MerchantHeader() {
  const { push } = useRouter()
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Logout successful
        console.log('Logout successful');
        push("/login")
        // Perform any additional actions such as redirecting to the login page
      } else {
        // Logout failed
        console.error('Logout failed:', response.status);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle the error appropriately
    }
  };
  return (
      <div className="w-full top-0 sticky gradient-background-dark">
        <div className="w-full flex flex-row justify-between p-3 text-white">
          <p className="text-3xl uppercase font-bold">Luxe.</p>
          <div className='flex flex-row justify-center gap-5'>
            <Link href={`/analytics`} className='px-2 flex items-center'>Analytics</Link>
            <Link href={`/brands`} className='px-2 flex items-center'>My Brands</Link>
            <Link href={`/reports`} className='px-2 flex items-center'>Reports</Link>
            <Link href={`/merchnotifications`} className='px-2 flex items-center'>My Notifications</Link>
          </div>
          <div>
                <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
  )
}