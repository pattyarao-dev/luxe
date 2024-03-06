import MerchantHeader from '@/components/reusable/merchantheader'
import MerchNotificationsComp from '@/components/pages/merchnotifications/merchnotificationsComponent'
import React from 'react'

export default function BrandProfile() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <MerchNotificationsComp/>
        </main>
    )
  }