import AnalyticsComp from "@/components/pages/analytics/analyticsComponent"
import MerchantHeader from "@/components/reusable/merchantheader"
import React, { Suspense } from "react"
import { getTokenContent } from "../(services)/frontend/get_token"

export default function Analytics() {
    let tokenContent = getTokenContent()
    const { _id, user_type } = tokenContent
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="w-full min-h-screen flex flex-col">
                <MerchantHeader />
                <AnalyticsComp
                    _id={tokenContent._id}
                    user_type={tokenContent.user_type}
                />
            </main>
        </Suspense>
    )
}
