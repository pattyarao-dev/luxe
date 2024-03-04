"use client"
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'

interface Reward {
    _id: string;
    reward_name: string;
    expiry: string;
    cap: number;
    status: boolean;
    brand_name: string;
}

interface APIResponse {
    status: number;
    data: Reward[];
}

export default function ViewRewardsComp() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id)

    const [rewardsData, setRewardsData] = useState<Reward[]>([]);

    useEffect(() => {
        async function fetchRewardsData() {
            try {
                const response = await fetch(`/api/merchantrewards?id=${id}`);
                if (response.ok) {
                    const data: APIResponse = await response.json();
                    setRewardsData(data.data);
                } else {
                    console.error('Failed to fetch rewards data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching rewards data:', error);
            }
        }

        if (id){
            fetchRewardsData(); 
        }
    }, [id]);

    if (!rewardsData || rewardsData.length === 0) {
        return <div>Loading...</div>;
    }

    console.log(rewardsData)

    return (
        <div className="w-full flex flex-col justify-center items-center gap-7 p-20">
                <h1 className="w-full px-10 text-4xl font-bold text-center">{rewardsData[0].brand_name}</h1>
            <div className='w-full flex flex-row justify-end'>
                <div className='flex gap-2'>
                    <button className='px-5 gradient-button shadow-lg'>Add a Reward</button>
                    <button className='px-5 outlined-button shadow-lg'>Delete a Reward</button>
                </div>
            </div>
            <div className='w-full p-0 flex flex-row justify-end'>
                <div className='flex gap-2'>
                    <button className='px-5 outlined-button'>status: all</button>
                    <button className='px-5 outlined-button'>capacity: all</button>
                    <button className='px-5 outlined-button'>sort: recently added</button>
                    <button className='px-5 outlined-button'>Search a reward</button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-md border-b-2 uppercase dark:bg-gray-700 dark:text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Reward name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Expiry Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Capacity
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rewardsData.map(reward => (
                        <tr key={reward._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {reward.reward_name}
                            </th>
                            <td className="px-6 py-4 text-center">
                                {new Date(reward.expiry).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {reward.cap}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-yellow-100 text-yellow-800 font-medium px-5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{reward.status ? "Ongoing" : "Expired"}</span>
                            </td>
                        </tr>
                    ))}
                    {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Reward 1
                        </th>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            90%
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-yellow-100 text-yellow-800 font-medium px-5 py-1.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Ongoing</span>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Reward 2
                        </th>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            90%
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-red-100 text-red-800 font-medium px-5 py-1.5 rounded-full dark:bg-red-900 dark:text-red-300">Cancelled</span>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Reward 3
                        </th>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            90%
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-green-100 text-green-800 font-medium px-5 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">Completed</span>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Reward 4
                        </th>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            90%
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-gray-100 text-gray-800 font-medium px-5 py-1.5 rounded-full dark:bg-gray-900 dark:text-gray-300">Scheduled</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Reward 5
                        </th>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            90%
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-green-100 text-green-800 font-medium px-5 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">Completed</span>
                        </td>
                    </tr> */}
                </tbody>
            </table>
            {/* <table className="w-full table-fixed">
                <thead>
                    <tr className='text-2xl'>
                    <th className='text-start'>Rewards</th>
                    <th className='text-start'>Expiry Date</th>
                    <th className='text-start'>Capacity</th>
                    <th className='text-start'>Status</th>
                    </tr>
                </thead>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <tbody>
                    <tr className='text-lg'>
                    <td>Reward 1</td>
                    <td>Reward 2</td>
                    <td>Reward 3</td>
                    <td>Reward 3</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    </tr>
                </tbody>
            </table> */}
            {/* <div className='w-full flex flex-row justify-between'>
                <h1 className='text-2xl text-start'>Rewards</h1>
                <div className='flex flex-row'>
                    <h1 className='text-2xl'>Expiry Date</h1>
                    <h1 className='text-2xl'>Expiry Date</h1>
                    <h1 className='text-2xl'>Expiry Date</h1>
                </div>
            </div> */}
        </div>
    )
}