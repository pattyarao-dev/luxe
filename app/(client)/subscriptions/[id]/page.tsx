"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ObjectId } from 'mongoose';
import Link from 'next/link';
import Brand from '@/app/(models)/Brand';

async function getBrands() {
  try {
    const brands = await Brand.find().exec()
    return brands;
  } catch (error) {
    console.log("error fetching brands", error)
    return [];
  }
}

export default async function Subscriptions({params}:  {params: {slug: ObjectId}}) {
  
  const brands = await getBrands()

  const subscriptions = [
    {
      brand: "Louis Vuitton",
      sub_count: 15000,
      tag: "Shopping"
    },
    {
      brand: "Kate Spade",
      sub_count: 2000,
      tag: "Shopping"
    },
    {
      brand: "Balenciaga",
      sub_count: 15000,
      tag: "Shopping"
    },
  ]

  return (
    <main className="w-full min-h-screen">
        <div className="w-full h-fit px-4 py-8 flex flex-col justify-center gap-4">
          <h1 className="text-dark-purple text-2xl font-bold">My Subscriptions</h1>
          <hr className="w-full border border-dark-pink"/>
        </div>
        <div className="w-full flex flex-col gap-8 p-4">
          {subscriptions.map((brand, index) => (
            <div key={index} className="bg-white border border-dark-purple rounded-lg flex flex-col gap-1 drop-shadow-dark-purple px-3 py-4">
              <div className="w-full flex justify-start">
                <p className="w-fit px-3 py-0.5 bg-gradient-to-br from-purple to-midnight-blue text-white rounded-lg text-xs">{brand.tag}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="w-[70px]">
                <Image src="/cuate.png" width={70} height={40} alt="brand image" className="w-full object-cover"/>
              </div>
              <div className="flex flex-col gap-0.5 p-4 justify-between">
                
                <Link href={`/brand/${brand.id}`}><p className="font-bold">{brand.brand}</p></Link>
                <p>{brand.sub_count}</p>
                <div className="w-full flex gap-4">
                  <button className="px-3 py-0.5 bg-gradient-to-br from-purple to-midnight-blue text-white rounded-lg">Notify Me</button>
                  <button className="px-3 py-0.5 border border-dark-pink rounded-lg">Unsubscribe</button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
    </main>
  )
}



