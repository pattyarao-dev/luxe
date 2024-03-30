"use client"

import React, { useState, useEffect } from 'react'
import { TotalRewardClaimsPerBrand } from './TotalRewardClaimsPerBrand'
import { RewardsRedemptionPerBrand } from './RewardsRedemptionPerBrand'
import { NotificationsRewardTurnover } from './NotificationsRewardTurnover'


interface TokenContent {
    _id: string
    user_type: string
}

interface Brand {
    _id: string
    brand_name: string
}


export const ReportPage : React.FC<TokenContent> = ({ _id, user_type })=> {

    const [submitted, setSubmitted] = useState(false)

    const [selectedReportName, setSelectedReportName] = useState<string>("")
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("firstsix"); // State to save the selected time period
    const [brand, setBrand] = useState<string>("")
    const [dropdownOptions, setDropdownOptions] = useState<Brand[]>([])

    
    const isAdminAll = user_type === "ADMIN_ALL";

    let REPORT_NAME = ["Rewards Redemption per Branch Analysis Report", "Notifications Reward Turnover Report"];

    if (isAdminAll) {
        REPORT_NAME.unshift("Total Reward Claims per Brand Report");
    }

    const TIME_PERIOD_OPTIONS = [
        { label: "January - June (First 6 months)", value: "firstsix" },
        { label: "July - December (Last 6 months)", value: "lastsix" }
    ];

    const handleReportChange= (report: string) => {
        setSelectedReportName(report);
        setSubmitted(false); 
    };


    const handleGenerateReport = (report: string) => {
        setSubmitted(true); // Set submitted to false when a button is clicked
    };

    const handleTimePeriodChange = (event: any) => {
        setSelectedTimePeriod(event.target.value);
    };

    const handleBrandChange = (event: any) => {
        console.log(event.target.value)
        setBrand(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isAdminAll && (selectedReportName === "Rewards Redemption per Branch Analysis Report" || selectedReportName === "Notifications Reward Turnover Report")) {
                try {
                    const response = await fetch(`api/analytics/dropdown/dropbrand?id=${_id}`);
                    const data = await response.json();
                    setDropdownOptions(data);
                } catch (error) {
                    console.error("Error fetching dropdown options:", error);
                }
            }
        };

        fetchData();
    }, [isAdminAll, selectedReportName, _id]);

  return (
  <main className="flex flex-col gap-6 p-2">
        <section className="w-full flex flex-col">
            <h1 className="w-full p-4 font-black text-2xl uppercase text-purple">Report Generation</h1>
            <div className="w-full p-4 flex gap-4 items-center">
                <p>Select report to generate:</p>
                <div className="flex gap-4">
                    {REPORT_NAME.map((report, index) => (
                        <button key={index} onClick={() => handleReportChange(report)} className="w-fit px-3 py-1 bg-gradient-to-br from-purple to-dark-pink text-white font-semibold rounded-md">{report}</button>
                    ))}
                </div>
                
            </div>
            <hr  className="w-full border border-dark-pink"/>
        </section>
        <section className="w-full h-[80vh] flex justify-between">
            <div className="w-1/4 h-full p-4 flex flex-col items-center justify-start gap-4 bg-neutral-50 drop-shadow-md rounded-md">
                {selectedReportName === "Total Reward Claims per Brand Report" && (
                        <>
                            <label htmlFor="timePeriod">Select Time Period:</label>
                            <select id="timePeriod" value={selectedTimePeriod} onChange={handleTimePeriodChange} className="px-3 py-1 bg-white border border-gray-300 rounded-md">
                                <option value="">Select Time Period</option>
                                {TIME_PERIOD_OPTIONS.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </>
                    )}

                {(selectedReportName === "Rewards Redemption per Branch Analysis Report" || selectedReportName === "Notifications Reward Turnover Report") && isAdminAll && (
                    <>
                        <label htmlFor="dropdown">Select Brand:</label>
                        <select id="dropdown" value={brand} onChange={handleBrandChange} className="px-3 py-1 bg-white border border-gray-300 rounded-md">
                            <option value="">Select Brand</option>
                            {dropdownOptions.map((option, index) => (
                                <option key={index} value={option._id}>{option.brand_name}</option>
                            ))}
                        </select>
                    </>

                    )}

            {selectedReportName !== "" ? (<> <button onClick={() => setSubmitted(true)} className="w-fit px-3 py-1 bg-gradient-to-br from-purple to-dark-pink text-white font-semibold rounded-md">Generate Report</button></>) : null}

           

            </div>
            <div className="w-[80%] h-full px-4 flex flex-col items-center justify-start gap-4 ">
               <div className="w-full text-center font-bold text-2xl">
                 {selectedReportName !== "" ? (<p>{selectedReportName}</p>) : (<p>Please Select a report</p>)}
               </div>
               <div className="w-full h-full overflow-y-auto p-4 bg-neutral-100 rounded-md drop-shadow-md">
                {
                    selectedReportName === "Total Reward Claims per Brand Report" && submitted ? (
                       <TotalRewardClaimsPerBrand id={_id} filter={selectedTimePeriod}/>
                    ) : selectedReportName === "Rewards Redemption per Branch Analysis Report" && user_type === "ADMIN"  && submitted ? (
                        <RewardsRedemptionPerBrand id={_id} user_type={user_type}/>
                    ) : selectedReportName === "Rewards Redemption per Branch Analysis Report" && user_type === "ADMIN_ALL"  && submitted ? (
                        <RewardsRedemptionPerBrand id={brand} user_type={user_type}/>
                    ) : selectedReportName === "Notifications Reward Turnover Report" && user_type === "ADMIN"  && submitted ? (
                        <NotificationsRewardTurnover id={_id} user_type={user_type}/>
                    ) : selectedReportName === "Notifications Reward Turnover Report" && user_type === "ADMIN_ALL"  && submitted ? (
                        <NotificationsRewardTurnover id={brand} user_type={user_type}/>
                    ) : null
                }
               </div>
            </div>
        </section>
    
    </main>
  )
}
