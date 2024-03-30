import React, { useState, useEffect } from 'react'

interface RewardData {
    reward_name: string;
    claims: number;
    total_clicks: number;
}

interface SampleReport {
    id: number;
    date_created: string;
    year: string;
    brand: string;
    reward_data: RewardData[];
}

interface PropsContent {
    id: string, 
    user_type: string
}

export const NotificationsRewardTurnover: React.FC<PropsContent> = ({ id, user_type })  => {
    const [data, setData] = useState<SampleReport | null>(null);


    const calculateConversionRate = (rewardData: RewardData): number => {
    if (rewardData.total_clicks === 0) {
        return 0; // Avoid division by zero
    }
    const conversionRate = (rewardData.claims / rewardData.total_clicks) * 100; // Convert to percentage
    return conversionRate; // Convert to string with 1 decimal place
};

const calculateTotalClaims = (rewardData: RewardData[]): number => {
    let totalClaims = 0;

    rewardData.map((reward, index) => {
        totalClaims += reward.claims
    })
    return totalClaims
}

const calculateTotalClicks = (rewardData: RewardData[]): number => {

    let totalClicks = 0;

    rewardData.map((reward, index) => {
        totalClicks += reward.total_clicks
    })
    return totalClicks
}

const calculateAverageConversionRate = (rewardData: RewardData[]): number => {
    let totalConversionRate = 0;

    rewardData.forEach((reward) => {
        if (reward.total_clicks === 0) {
            totalConversionRate += 0;
        }
        else {
            const conversionRate = reward.claims / reward.total_clicks;
            totalConversionRate += conversionRate;
        }
        
        
    });

    if (rewardData.length === 0) {
        return 0; // To avoid division by zero
    }

    const averageConversionRate = (totalConversionRate / rewardData.length) * 100;
    return averageConversionRate;
};

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`api/report/notifturnover?id=${id}&usertype=${user_type}`);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, [id, user_type]);

if (!data || !data.reward_data) {
    return <div>Loading...</div>;
}


  return (
    <div className="w-full flex flex-col gap-10">
        <table className="w-full flex flex-col justify-evenly border border-neutral-400 text-sm">
             <tr className="w-full p-4 flex flex-col border border-neutral-400">
                <div className="w-full flex justify-between">
                    <p>Generated On {data.date_created}</p>
                    <p>Page 1</p>
                </div>
                <p className="w-full text-center">Rewards Redemption per Branch Analysis Report</p>
            </tr>
            <tr className="w-full p-2 flex justify-center border border-neutral-400">
                {data.brand}
            </tr>
            <tr className="w-full p-2 flex justify-center border border-neutral-400">
                {`${data.year}`}
            </tr>
            <tr className="w-full flex justify-evenly">
                <th className="w-[100px] grow border border-neutral-400">Reward Name</th>
                <th className="w-[100px] grow border border-neutral-400">Claims</th>
                <th className="w-[100px] grow border border-neutral-400">Notification Clicks</th>
                <th className="w-[100px] grow border border-neutral-400">Conversion Rate</th>
            </tr>
            <div className="w-full flex flex-col">
                {data.reward_data.map((reward, index) => (
                    <tr className="w-full flex justify-evenly">
                    <td className="w-[100px] grow border border-neutral-400">{reward.reward_name}</td>
                    <td className="w-[100px] grow border border-neutral-400 text-end">{reward.claims}</td>
                    <td className="w-[100px] grow border border-neutral-400 text-end">{reward.total_clicks}</td>
                    <td className="w-[100px] grow border border-neutral-400 text-end">{`${calculateConversionRate(reward).toFixed(1).toString()}%`}</td>
                    </tr>
                ))}
            </div>
            <tr className="w-full flex justify-evenly">
                <th className="w-[100px] grow border border-neutral-400">Total</th>
                <th className="w-[100px] grow border border-neutral-400">{calculateTotalClaims(data.reward_data)}</th>
                <th className="w-[100px] grow border border-neutral-400">{calculateTotalClicks(data.reward_data)}</th>
                <th className="w-[100px] grow border border-neutral-400"></th>
            </tr>
            <tr className="w-full flex justify-evenly">
                <th className="w-[100px] grow border border-neutral-400">Average Conversion Rate</th>
                <th className="w-[100px] grow border border-neutral-400"></th>
                <th className="w-[100px] grow border border-neutral-400"></th>
                <th className="w-[100px] grow border border-neutral-400">{`${calculateAverageConversionRate(data.reward_data).toFixed(1).toString()}%`}</th>
            </tr>
            {/*
            <tr className="w-full flex justify-evenly">
                <th className='grow border border-neutral-400'></th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                    <th key={index} className="w-[390px] border border-neutral-400">{month.month}</th>
                ))}
            </tr>
            <tr className="w-full flex justify-evenly">
                <th className='grow border border-neutral-400'>Brand Name</th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                    <div key={index} className="w-[390px] flex justify-between text-xs border border-neutral-400">
                        <th className="w-1/3 text-center border-r border-neutral-400">Claims</th>
                        <th className="w-1/3 text-center  border-r border-neutral-400">Clicks</th>
                        <th className="w-1/3 text-center">Conversion Rate</th>
                    </div>
                ))}
            </tr>
           <tr className="w-full flex justify-evenly">

               
               <div className="flex flex-col grow text-xs">
                {REWARDS.map((reward) => (
                <tr className='grow border border-neutral-400'>{reward}</tr>
               ))}
               </div>

           
                 {SAMPLE_REPORT.monthly_data.map((month, index) => (
                   <tr>
                    {month.reward_data.map((reward, index) => (
                        <div className="w-[390px] flex justify-between text-xs border border-neutral-400">
                            <td className="w-1/3 text-center border-r border-neutral-400">{reward.claims}</td>
                            <td className="w-1/3 text-center  border-r border-neutral-400">{reward.total_clicks}</td>
                            <td className="w-1/3 text-center">{`${calculateConversionRate(reward).toFixed(1).toString()}%`}</td>
                        </div>
                    ))}
                   </tr>
                ))}
            </tr>
            <tr className="w-full flex">
                <th className='grow border border-neutral-400 text-sm'>Total</th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                   <tr className="w-[390px] flex justify-between text-xs border border-neutral-400">
                        <td className="w-1/3 text-center border-r border-neutral-400">{getTotalClaimsPerMonth([month])}</td>
                        <td className="w-1/3 text-center border-r border-neutral-400">{getTotalClicksPerMonth([month])}</td>
                        <td className="w-1/3 text-center"></td>
                   </tr>
                ))}
            </tr>
            <tr className="w-full flex">
                <th className='grow border border-neutral-400 text-sm'>Average Conversion Rate</th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                   <tr className="w-[390px] flex justify-between text-xs border border-neutral-400">       
                        <td className="w-1/3 text-center border-r border-neutral-400"></td>
                        <td className="w-1/3 text-center border-r border-neutral-400"></td>
                        <td className="w-1/3 text-center">{`${getAverageConversionRatePerMonth([month]).toFixed(1).toString()}%`}</td>
                   </tr>
                ))}
            </tr> */}
            
        </table>
        <div className="w-full flex justify-center items-center gap-4">
            <div className="w-2/3 flex justify-center items-center gap-4">
                <hr className="grow border border-neutral-500" />
                <p className="font-black uppercase text-neutral-800">End of Report</p>
                <hr className="grow border border-neutral-500" />
            </div>
        </div>
    </div>
  )
}
