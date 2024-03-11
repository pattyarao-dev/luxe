'use client'

import React from 'react'
import Link from 'next/link'

export default function MerchantHeader() {
  return (
      <div className="w-full top-0 sticky gradient-background-dark">
        <div className="w-full flex flex-row justify-between p-3 text-white">
          <p className="text-3xl uppercase font-bold">Luxe.</p>
          <div className='flex flex-row justify-center gap-5'>
            <button className='px-2'>Analytics</button>
            <Link href={`/brands`} className='px-2 flex items-center'>My Brands</Link>
            <button className='px-2'>Employees</button>
            <button className='px-2'>Schedule Notifications</button>
            <Link href={`/merchnotifications`} className='px-2 flex items-center'>My Notifications</Link>
          </div>
          <div></div>
        </div>
      </div>
  )
}
