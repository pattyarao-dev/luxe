import React from 'react'

export default function UserManagement() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
            <h1 className="w-full px-10 text-4xl font-bold text-center">Brand 1</h1>
            <div className='w-1/3 flex flex-row gap-4'>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:branch</button>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:type</button>
            </div>
            <div className='px-10 py-10'>
                There are no active users for this brand
            </div>
            <button className='px-20 outlined-button'>ADD USER</button>
        </div>
    )
}