import { BrandTypes } from '@/app/types/brandTypes'
import { ObjectId } from 'mongoose'
import React from 'react'
import Brand from '@/app/(models)/Brand'
import { ClientBrandProfile } from '@/components/pages/clientbrandprofile/clientBrandProfile'

// async function getBrand(id: ObjectId){
//   try {
//     const brand = Brand.findById(id).exec()
    
//     return brand
//   } catch (error) {
//     console.error('Error fetching brand', error);
//     return;
//   }

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbrands/selected?id=${id}`)
//     const brand = await res.json()
//     return brand
//   } catch (error) {
//     console.error("error fetching brand", error)
//   }
// }

export default async function BrandProfile({params}: {params: {id: string}}) {
  // const brand = await getBrand(params._id)
  // console.log(brand)
  return (
    <main>
      {/* {brand && (
        <p>{brand.brand_name}</p>
      )} */}
      <ClientBrandProfile brandId={params.id}/>
    </main>
  )
}
