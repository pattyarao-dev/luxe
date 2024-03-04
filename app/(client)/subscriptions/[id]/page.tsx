import React from 'react'
import Image from 'next/image'


export default function Subscriptions({params}:  {params: {slug: string}}) {

  return (
    <main className="w-full min-h-screen">
        <div className="w-full h-fit px-4 py-8 flex flex-col justify-center gap-4">
          <h1 className="text-dark-purple text-2xl font-bold">My Subscriptions</h1>
          <hr className="w-full border border-dark-pink"/>
        </div>
    </main>
  )
}



