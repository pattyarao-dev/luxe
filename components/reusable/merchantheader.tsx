'use client'

import React from 'react'

export default function MerchantHeader() {
  return (
    <>
      <div className="w-full gradient-background-dark">
        <div className="w-full flex flex-row justify-between p-3 text-white">
          <p className="text-4xl uppercase font-bold">Luxe.</p>
          <div className='flex flex-row justify-center gap-5'>
            <button className='px-2'>Analytics</button>
            <button className='px-2'>My Brands</button>
            <button className='px-2'>Employees</button>
            <button className='px-2'>Schedule Notifications</button>
            <button className='px-2'>My Notifications</button>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}
