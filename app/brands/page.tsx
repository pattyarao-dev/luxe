import BrandComp from '@/components/pages/brands/brandsComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function Brands() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <BrandComp/>
        </main>
    )
}