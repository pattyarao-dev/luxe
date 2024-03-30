import { ReportPage } from '@/components/pages/reports/ReportPage'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'
import { getTokenContent } from "../(services)/frontend/get_token"

export default function page() {
  let tokenContent = getTokenContent()
  const { _id, user_type } = tokenContent
  return (
    <main className="w-full min-h-screen">
        <MerchantHeader/>
        <ReportPage
          _id={tokenContent._id}
          user_type={tokenContent.user_type}
        />
    </main>
  )
}
