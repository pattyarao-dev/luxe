import AnalyticsComp from '@/components/pages/analytics/analyticsComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React, {Suspense} from 'react'

export default function Analytics() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="w-full min-h-screen flex flex-col">
                <MerchantHeader/>
                <AnalyticsComp/>
            </main>
        </Suspense>
    )
  }