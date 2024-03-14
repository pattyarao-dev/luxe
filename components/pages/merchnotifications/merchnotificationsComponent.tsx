"use client"
import React, {useEffect, useState} from 'react'

interface Notification {
    _id: string;
    message: string;
    clicks: number;
    sender: {
        brand_name: string;
    }
    reward: {
        reward_name: string;
    }
    created_at: string;
}

interface APIResponse {
    notifications: Notification[];
}

interface MerchNotificationsProps {
    id: string;
}

export default function MerchNotificationsComp({id} : MerchNotificationsProps) {
    console.log(id)

    const [notifications, setNotifications] = useState<Notification[]>([]);
    useEffect(() => {
        async function fetchNotificationsData() {
            try {
                const response = await fetch(`/api/notifications/merchantread?id=${id}`);
                if (response.ok) {
                    const notifications: APIResponse = await response.json();
                    setNotifications(notifications.notifications);
                } else {
                    console.error('Failed to fetch notifications data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching notifications data:', error);
            }
        }

        if (id){
            fetchNotificationsData(); 
        }
    }, [id]);

    if (!notifications || notifications.length === 0) {
        return <div>Loading...</div>;
    }

    console.log(notifications)

    return (
        <div className="w-full flex flex-col justify-center items-center gap-7 p-20">
            <div className='w-full flex flex-row justify-end'>
                <div className='flex gap-2'>
                    <button className='px-5 gradient-button shadow-lg'>Add a Notification</button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-md border-b-2 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Notification name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Brand Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Reward Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Number of Clicks
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notification => (
                        <tr key={notification._id} className="odd:bg-white even:bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {notification.message}
                            </th>
                            <td className="px-6 py-4 text-center">
                                {notification.sender.brand_name}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {notification.reward.reward_name}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-yellow-100 text-yellow-800 font-medium px-5 py-1.5 rounded-full">Ongoing</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {new Date(notification.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {notification.clicks}
                            </td>
                        </tr>
                    ))}
                    
                    {/* <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Notification 2
                        </th>
                        <td className="px-6 py-4 text-center">
                            Brand 2
                        </td>
                        <td className="px-6 py-4 text-center">
                            Reward 2
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-red-100 text-red-800 font-medium px-5 py-1.5 rounded-full">Cancelled</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            999
                        </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Notification 3
                        </th>
                        <td className="px-6 py-4 text-center">
                            Brand 3
                        </td>
                        <td className="px-6 py-4 text-center">
                            Reward 3
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-green-100 text-green-800 font-medium px-5 py-1.5 rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            999
                        </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Notification 4
                        </th>
                        <td className="px-6 py-4 text-center">
                            Brand 4
                        </td>
                        <td className="px-6 py-4 text-center">
                            Reward 4
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-gray-100 text-gray-800 font-medium px-5 py-1.5 rounded-full">Scheduled</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            999
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Notification 5
                        </th>
                        <td className="px-6 py-4 text-center">
                            Brand 5
                        </td>
                        <td className="px-6 py-4 text-center">
                            Reward 5
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-green-100 text-green-800 font-medium px-5 py-1.5 rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                            MM/DD/YYYY
                        </td>
                        <td className="px-6 py-4 text-center">
                            999
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}