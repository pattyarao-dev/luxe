import ViewRewardsComp from '@/components/pages/viewrewards/viewrewardsComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function ViewRewards() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <ViewRewardsComp/>
        </main>
    )
}