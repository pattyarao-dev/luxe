"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ObjectId } from 'mongoose';


export default function Subscriptions({params}:  {params: {slug: ObjectId}}) {

  const subscriptions = [
    {
      brand: "Louis Vuitton",
      sub_count: 15000,
      tag: "shopping"
    },
    {
      brand: "Kate Spade",
      sub_count: 2000,
      tag: "shopping"
    },
    {
      brand: "Balenciaga",
      sub_count: 15000,
      tag: "shopping"
    },
  ]

  return (
    <main className="w-full min-h-screen">
        <div className="w-full h-fit px-4 py-8 flex flex-col justify-center gap-4">
          <h1 className="text-dark-purple text-2xl font-bold">My Subscriptions</h1>
          <hr className="w-full border border-dark-pink"/>
        </div>
        <div className="w-full flex flex-col gap-4">
          {subscriptions.map((brand, index) => (
            <div key={index} className="bg-red-200">
              <div>
                <Image src="/cuate.png" width={50} height={50} alt="brand image"/>
              </div>
              <div>
                <p>{brand.tag}</p>
                <p>{brand.brand}</p>
                <p>{brand.sub_count}</p>
                <div>
                  <button>Notify Me</button>
                  <button>Unsubscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </main>
  )
}



