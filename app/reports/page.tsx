import { ReportPage } from '@/components/pages/reports/ReportPage'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function page() {

    
  return (
    <main className="w-full min-h-screen">
        <MerchantHeader/>
        <ReportPage/>
    </main>
  )
}
