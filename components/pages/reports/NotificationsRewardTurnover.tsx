import React from 'react'

interface RewardData {
    reward_name: string;
    claims: number;
    total_clicks: number;
}

interface MonthlyData {
    month: string;
    reward_data: RewardData[];
}

interface SampleReport {
    id: number;
    date_created: string;
    year: string;
    brand: string;
    monthly_data: MonthlyData[];
}

export const NotificationsRewardTurnover = () => {

    const REWARDS = ["Monogram Service", "VIP Access", "Travel Experience"]
    const SAMPLE_REPORT : SampleReport = {
        id: 1,
        date_created: "June 31, 2024",
        year: "2024",
        brand: "Louis Vuitton",
        monthly_data: [
            {
                month: "Jan",
                reward_data: [
                    {
                        reward_name: "Monogram Service",
                        claims: 123,
                        total_clicks: 500
                    },
                    {
                        reward_name: "VIP Access",
                        claims: 456,
                        total_clicks: 600
                    },
                    {
                        reward_name: "Travel Experience",
                        claims: 789,
                        total_clicks: 800
                    },
                ]
            },
            {
                month: "Feb",
                reward_data: [
                    {
                        reward_name: "Monogram Service",
                        claims: 321,
                        total_clicks: 400
                    },
                    {
                        reward_name: "VIP Access",
                        claims: 654,
                        total_clicks: 700
                    },
                    {
                        reward_name: "Travel Experience",
                        claims: 987,
                        total_clicks: 1000
                    },
                ]
            },
            {
                month: "Mar",
                reward_data: [
                    {
                        reward_name: "Monogram Service",
                        claims: 234,
                        total_clicks: 250
                    },
                    {
                        reward_name: "VIP Access",
                        claims: 567,
                        total_clicks: 600
                    },
                    {
                        reward_name: "Travel Experience",
                        claims: 891,
                        total_clicks: 1000
                    },
                ]
            }
        ]
    }

    const calculateConversionRate = (rewardData: RewardData): number => {
    if (rewardData.total_clicks === 0) {
        return 0; // Avoid division by zero
    }
    const conversionRate = (rewardData.claims / rewardData.total_clicks) * 100; // Convert to percentage
    return conversionRate; // Convert to string with 1 decimal place
};

const getTotalClaimsPerMonth = (monthlyData: MonthlyData[]): number => {
    return monthlyData.reduce((total, month) => {
        return total + month.reward_data.reduce((monthTotal, reward) => monthTotal + reward.claims, 0);
    }, 0);
};

// Function to get the total clicks for all rewards in a given month
const getTotalClicksPerMonth = (monthlyData: MonthlyData[]): number => {
    return monthlyData.reduce((total, month) => {
        return total + month.reward_data.reduce((monthTotal, reward) => monthTotal + reward.total_clicks, 0);
    }, 0);
};

const getAverageConversionRatePerMonth = (monthlyData: MonthlyData[]): number => {
    const totalConversionRates = monthlyData.reduce((total, month) => {
        const conversionRates = month.reward_data.map(reward => calculateConversionRate(reward));
        const sum = conversionRates.reduce((acc, rate) => acc + rate, 0);
        return total + (sum / conversionRates.length);
    }, 0);
    return totalConversionRates / monthlyData.length;
};



  return (
    <div className="w-full flex flex-col gap-10">
        <table className="w-full flex flex-col justify-evenly border border-neutral-400">
            <tr className="w-full p-4 flex flex-col border border-neutral-400">
                <div className="w-full flex justify-between">
                    <p>{SAMPLE_REPORT.date_created}</p>
                    <p>Page 1</p>
                </div>
                <p className="w-full text-center">Rewards Redemption per Branch Analysis Report</p>
            </tr>
            <tr className="w-full p-2 flex justify-center border border-neutral-400">
                {SAMPLE_REPORT.brand}
            </tr>
            <tr className="w-full p-2 flex justify-center border border-neutral-400">
                {SAMPLE_REPORT.year}
            </tr>
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

                {/* the first column maps the different brands available*/}
               <div className="flex flex-col grow text-xs">
                {REWARDS.map((reward) => (
                <tr className='grow border border-neutral-400'>{reward}</tr>
               ))}
               </div>

               {/* the succeeding columns map out the data for the specific brands under specific months*/}
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
            </tr>
            
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
