"use client"

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { BrandTypes } from '@/app/types/brandTypes'
import { ObjectId } from 'mongoose'

export const ClientBrandProfile = ({brandId}: {brandId: string}) => {

    const [brand, setBrand] = useState<BrandTypes>()
    useEffect(() => {
        async function getBrand(){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbrands/selected?id=${brandId}`)
                const data = await res.json()
                console.log(data)
                setBrand(data.data)
            } catch (error){
                console.error("error fetching brand")
            }
        }

        if (brandId) {
            getBrand()
        }
    }, [brandId])
    
  return (
    
    <main className="w-full min-h-screen flex flex-col gap-16">
        <div className="w-full h-32 bg-dark-purple flex justify-center">
            <div className="absolute w-[150px] drop-shadow-sm top-32">
                <img src="/cuate.png" alt="" className="w-full p-4 object-cover rounded-full bg-white" />
            </div>
        </div>
        {brand && (
        <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
            <p className='text-2xl font-bold'>{brand.brand_name}</p>
            <p>Subscribers: {brand.total_fcount}</p>
            <button className="gradient-button">Subscribe</button>
        </div>
        )}
        
    </main>
  )
}
