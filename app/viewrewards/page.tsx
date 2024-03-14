import ViewRewardsComp from '@/components/pages/viewrewards/viewrewardsComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React, {Suspense} from 'react'

export default function ViewRewards() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="w-full min-h-screen flex flex-col">
                <MerchantHeader/>
                <ViewRewardsComp/>
            </main>
        </Suspense>
    )
}