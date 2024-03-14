import BrandProfileComp from '@/components/pages/brandprofile/brandprofileComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React, {Suspense} from 'react'

export default function BrandProfile() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="w-full min-h-screen flex flex-col">
                <MerchantHeader/>
                <BrandProfileComp/>
            </main>
        </Suspense>
    )
  }