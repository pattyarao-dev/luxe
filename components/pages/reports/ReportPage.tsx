"use client"

import React, { useState } from 'react'
import { TotalRewardClaimsPerBrand } from './TotalRewardClaimsPerBrand'
import { RewardsRedemptionPerBrand } from './RewardsRedemptionPerBrand'
import { NotificationsRewardTurnover } from './NotificationsRewardTurnover'

export const ReportPage = () => {
    const REPORT_NAME = ["Total Reward Claims per Brand Report", "Rewards Redemption per Branch Analysis Report", "Notifications Reward Turnover Report"]
    const [selectedReportName, setSelectedReportName] = useState<string>("")

  return (
  <main className="flex flex-col gap-6 p-2">
        <section className="w-full flex flex-col">
            <h1 className="w-full p-4 font-black text-2xl uppercase text-purple">Report Generation</h1>
            <div className="w-full p-4 flex gap-4 items-center">
                <p>Select report to generate:</p>
                <div className="flex gap-4">
                    {REPORT_NAME.map((report, index) => (
                        <button key={index} onClick={() => setSelectedReportName(report)} className="w-fit px-3 py-1 bg-gradient-to-br from-purple to-dark-pink text-white font-semibold rounded-md">{report}</button>
                    ))}
                </div>
                
            </div>
            <hr  className="w-full border border-dark-pink"/>
        </section>
        <section className="w-full h-[80vh] flex justify-between">
            <div className="w-1/4 h-full p-4 flex flex-col items-center justify-start gap-4 bg-neutral-50 drop-shadow-md rounded-md">
                <p>input fields go here</p>
            </div>
            <div className="w-[80%] h-full px-4 flex flex-col items-center justify-start gap-4 ">
               <div className="w-full text-center font-bold text-2xl">
                 {selectedReportName !== "" ? (<p>{selectedReportName}</p>) : (<p>Select a report</p>)}
               </div>
               <div className="w-full h-full overflow-y-auto p-4 bg-neutral-100 rounded-md drop-shadow-md">
                {
                    selectedReportName === "Total Reward Claims per Brand Report" ? (
                       <TotalRewardClaimsPerBrand/>
                    ) : selectedReportName === "Rewards Redemption per Branch Analysis Report" ? (
                        <RewardsRedemptionPerBrand/>
                    ) : selectedReportName === "Notifications Reward Turnover Report" ? (
                        <NotificationsRewardTurnover/>
                    ) : null
                }
               </div>
            </div>
        </section>
    
    </main>
  )
}
