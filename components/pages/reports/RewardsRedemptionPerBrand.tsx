import React from 'react'

interface RewardData {
    reward_name: string;
    claims: number;
    cap: number;
}

interface BranchData {
    branch_name: string;
    reward_data: RewardData[];
}

interface SampleReport {
    id: number;
    date_created: string;
    year: string;
    brand: string;
    branch_data: BranchData[];
}


export const RewardsRedemptionPerBrand = () => {

    const BRANCHES = ["Quezon City", "Makati", "BGC"]

    const SAMPLE_REPORT: SampleReport = {
        id: 1,
        date_created: "June 31, 2024",
        year: "2024",
        brand: "Louis Vuitton",
        branch_data: [
            {
                branch_name: "Quezon City",
                reward_data: [
                    {
                        reward_name: "Reward 1",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 2",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 3",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 4",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 5",
                        claims: 100,
                        cap: 100
                    },
                ]
            },
            {
                branch_name: "Makati",
                reward_data: [
                    {
                        reward_name: "Reward 1",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 2",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 3",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 4",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 5",
                        claims: 100,
                        cap: 100
                    },
                ]
            },
            {
                branch_name: "BGC",
                reward_data: [
                    {
                        reward_name: "Reward 1",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 2",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 3",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 4",
                        claims: 100,
                        cap: 100
                    },
                    {
                        reward_name: "Reward 5",
                        claims: 100,
                        cap: 100
                    },
                ]
            },
        ]
    }

    const calculateTotalClaimsPerBranch = (branchData: BranchData): number => {
    return branchData.reward_data.reduce((total, reward) => total + reward.claims, 0);};

    // Function to calculate total caps for a branch
    const calculateTotalCapsPerBranch = (branchData: BranchData): number => {
    return branchData.reward_data.reduce((total, reward) => total + reward.cap, 0);};


  return (
    <div className="w-full flex flex-col gap-10">
        <table className="w-full flex flex-col justify-evenly border border-neutral-400 text-sm">
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
            <tr className="w-full flex justify-between">
                <th className="w-[500px] border border-neutral-400">Branch Name</th>
                <th className="w-[500px] border border-neutral-400">Reward Name</th>
                <th className="w-[100px] grow border border-neutral-400">Claims</th>
                <th className="w-[100px] grow border border-neutral-400">Cap</th>
            </tr>
            <tr className="w-full flex flex-col">
                {SAMPLE_REPORT.branch_data.map((branch, index) => (
                    <div className="w-full flex flex-col">
                        <div className="flex">
                            <td className="w-[500px] border border-neutral-400">{branch.branch_name}</td>
                        <div className="grow flex flex-col">
                            {branch.reward_data.map((reward, index) => (
                            <div className="flex ">
                                <td className="w-[500px] border border-neutral-400">{reward.reward_name}</td>
                                <td className="w-[100px] grow border border-neutral-400">{reward.claims}</td>
                                <td className="w-[100px] grow border border-neutral-400">{reward.cap}</td>
                            </div>
                        ))}
                        </div>
                        </div>
                        <tr className="w-full flex justify-between bg-neutral-300">
                            <th className="w-[500px] border border-neutral-400"></th>
                            <th className="w-[500px] px-3 border border-neutral-400 text-end">Total</th>
                            <td className="w-[100px] grow border border-neutral-400">{calculateTotalClaimsPerBranch(branch)}</td>
                            <td className="w-[100px] grow border border-neutral-400">{calculateTotalCapsPerBranch(branch)}</td>
                        </tr>
                    </div>
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
