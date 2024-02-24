import BrandProfileComp from '@/components/pages/brandprofile/brandprofileComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function BrandProfile() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <BrandProfileComp/>
        </main>
    )
  }