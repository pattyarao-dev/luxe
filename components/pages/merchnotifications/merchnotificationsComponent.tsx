"use client"
import React, {useEffect, useState, Fragment} from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'

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

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

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
                    <button className='px-5 gradient-button shadow-lg' onClick={openModal}>Add a Notification</button>

                    <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child 
                                    as={Fragment} 
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                        <Transition.Child 
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all'>
                                                <Dialog.Title
                                                    as="h1"
                                                    className='text-3xl font-bold leading-6 text-gray-900'
                                                >
                                                    Add a Notification
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <p className='text-sm text-gray-500'>
                                                        Fill out the form below to add a new notification:
                                                    </p>
                                                </div>

                                                <div className='mt-6 justify-center items-center text-center'>
                                                    <input type="text" className='w-full outlined-button' placeholder='Message'/>
                                                </div>

                                                <div className='mt-5 justify-center items-center text-center'>
                                                    <input type="text" className='w-80 outlined-button' placeholder='Branch location'/>
                                                </div>

                                                <div className='mt-6 p-1 text-center'>
                                                    <button
                                                        type='button'
                                                        className='w-80 gradient-button'
                                                        //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                                        onClick={closeModal}
                                                    >
                                                        Add Branch
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

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
                </tbody>
            </table>
        </div>
    )
}