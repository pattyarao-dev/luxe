import React from 'react'

export default function BrandProfile() {
    return (
    <div className="w-full min-h-screen flex flex-row justify-center gap-8 px-10 py-10">
        <div className='w-full'>
            <div className='w-full flex flex-row justify-between'>
                    <h1 className="text-3xl font-bold">Brand 1</h1>
                    <div className='flex gap-2'>
                        <button className='px-5 gradient-button'>View Rewards</button>
                        <button className='px-5 outlined-button'>User Management</button>
                    </div>
            </div>
            <div className='w-full py-4'>
                <p className='w-fit'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut. It has survived not only five centuries, but also 
                    the leap into electronic typesetting, remaining essentially unchanged. 
                    It was popularised in the 1960s with the release of Letraset sheets 
                    containing Lorem Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className='w-full py-4 flex flex-row justify-between'>
                <h1 className="text-3xl font-bold">Branches</h1>
                <button className='px-5 outlined-button'>Add a Branch</button>
            </div>
        </div>
        <div className='w-full rounded items-center border-solid border-2 px-10 py-4 gradient-background'>
            <h1 className='text-center text-3xl font-bold'>Subscriber Count</h1>
        </div>
    </div>
    )
  }