"use client"

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { BrandTypes } from '@/app/types/brandTypes'
import { ObjectId } from 'mongoose'

export const ClientBrandProfile = ({brandId}: {brandId: ObjectId}) => {

    const [brand, setBrand] = useState<BrandTypes>()
    useEffect(() => {
        async function getBrand(){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbrands/selected?id=${brandId}`)
                const data = await res.json()
                console.log(data)
                setBrand(data)
            } catch (error){
                console.error("error fetching brand")
            }
        }

        if (brandId) {
            getBrand()
        }
    }, [brandId])
    
  return (
    
    <div>
        {brand && (
            <p>{brand.brand_name}</p>
        )}
    </div>
  )
}
