"use client"
import React, {useEffect, useState, Fragment, ChangeEvent} from 'react'
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

interface Brand {
    _id: string;
    brand_name: string;
}

interface Reward {
    _id: string
    reward_name: string
    expiry: string
    cap: number
    status: boolean
    brand_name: string
}

interface APIResponse {
    status: number
    data: Reward[]
}

interface APIResponse {
    notifications: Notification[];
}

interface MerchNotificationsProps {
    id: string;
    userType: string;
}

export default function MerchNotificationsComp({id, userType} : MerchNotificationsProps) {
    console.log(id)
    console.log(userType)

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]); //for ADMIN_ALL
    const [rewardsData, setRewardsData] = useState<Reward[]>([])
    const [user, setUser] = useState<any>()
    const [dateTime, setDateTime] = useState<string>('');
    const [brandid, setBrandId] = useState<string>('');
    const [pickedReward, setPickedReward] = useState<string | null>(null)
    const [pickedBrand, setPickedBrand] = useState<string | null>(null)
    const [wantOpen, setWantOpen] = useState<boolean>(false)

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWantOpen(e.target.checked);
        console.log(wantOpen)
    };

    console.log(wantOpen)

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

        async function fetchDataBasedOnUserType() {
            if (userType === 'ADMIN_ALL') {
                try {
                    const response = await fetch(`/api/allbrands?id=${id}&userType=${userType}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBrands(data.brands);
                        console.log(data)
                    } else {
                        console.error('Failed to fetch brands:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error while fetching brands:', error);
                }
            } else if (userType === 'ADMIN') {
                try {
                    const response = await fetch(`/api/user?id=${id}`)
                    if (response.ok) {
                        const data = await response.json()
                        setUser(data.user)
                        console.log(data)
                        fetchRewardsData(data.user.assigned_brand)
                    }
                } catch (error) {
                    console.error('Error while fetching user:', error)
                }
            }
        }

        if (id){
            fetchNotificationsData(); 
            fetchDataBasedOnUserType()
        }
    }, [id]);

    const fetchRewardsData = async (brandId?: string) => {
        try {
            const response = await fetch(`/api/merchantrewards?id=${ (user && user.assigned_brand) || brandId}`);
            if (response.ok) {
                const data: APIResponse = await response.json();
                setRewardsData(data.data);
                console.log(data.data)
            } else {
                console.error('Failed to fetch rewards data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while fetching rewards data:', error);
        }
    };

    const [notificationPost, setNotificationPost] = useState({
        message: '',
        reward: '',
    })

    console.log(notificationPost)
    console.log(dateTime)

    function handleAddNotification() {
        let scheduled_post_date = ''; 
        
        if (dateTime) {
            scheduled_post_date = new Date(dateTime).toISOString();
        }
        const postData = {
            message: notificationPost.message,
            reward: notificationPost.reward,//where the _id would be,
            scheduled_post_date: scheduled_post_date,
        }
        console.log(postData)
        console.log(user && user.assigned_brand)
        console.log(brandid)
        console.log((user && user.assigned_brand) || brandid)

        fetch(`/api/notifications/create?id=${ (user && user.assigned_brand) || brandid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then((response) => {
                if (response.ok) {
                    // Brand added successfully, close the modal or perform any other actions
                    closeModal()
                } else {
                    // Handle errors if any
                    console.error("Failed to add brand:", response.statusText)
                }
            })
            .catch((error) => {
                console.error("Error while adding brand:", error)
            })
        
        window.location.reload()
    }

    function getBrandID(brandid: string) {
        setBrandId(brandid)
    }

    console.log(user)

    const handleChange = (e : any) => {
        const { name, value } = e.target
        setNotificationPost((prev) => ({ ...prev, [name]: value }))
        console.log(notificationPost)
    }

    const handleClick = (brandId: string) => {
        console.log('Selected brand ID:', brandId);
            fetchRewardsData(brandId);
            getBrandID(brandId)
    };

    console.log(brandid)

    const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateTime(event.target.value);
    };

    // if (!notifications || notifications.length === 0) {
    //     return <div>Loading...</div>;
    // }

    console.log(notifications)
    console.log(brands)
    console.log(rewardsData)
    console.log(user && user.assigned_brand)

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
                                                <input 
                                                    type="text" 
                                                    className='w-full input-style' 
                                                    placeholder='Message'
                                                    name='message'
                                                    value={notificationPost.message}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            {/* THIS ONLY SHOWS UP IF THE userType IS 'ADMIN_ALL' */}
                                            {userType === 'ADMIN_ALL' && (
                                                <div className='mt-5 justify-center items-center text-center'>
                                                    <Menu as="div" className="w-full relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                {pickedBrand ? pickedBrand : "Select a brand:"}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter='transition ease-out duration-100'
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            {/* THIS IS THE BRANDS DROPDOWN. IF THE userType IS 'ADMIN_ALL', THIS IS WHERE YOU'LL GET THE brand_id OF THE SELECTED BRAND. */}
                                                            <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                {brands.length > 0 && (
                                                                <div className="overflow-auto px-1 py-1 w-full h-40">
                                                                    {brands.map((brand : Brand, index : number) => (
                                                                        <Menu.Item key={index}>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    className={`${
                                                                                        active ? "bg-violet-500 text-white" : "text-gray-900"
                                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                    onClick={() => {
                                                                                        handleClick(brand._id)
                                                                                        setPickedBrand(brand.brand_name)
                                                                                    }}
                                                                                >
                                                                                    <strong className="px-1">{brand.brand_name}</strong>
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                </div>
                                                                )}
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                            )}
                                            

                                            {/* THIS IS ALWAYS PRESENT. WHEN THE userType IS ADMIN, IT SHOULD PASS IN THE assigned_brand OF THE USER.
                                                WHEN THE userType IS ADMIN_ALL, IT SHOULD TAKE THE brand_id FROM THE SELECTED BRAND IN THE PREVIOUS
                                                DROPDOWN AND PASS IT HERE                                                                           */}
                                            <div className='mt-5 justify-center items-center text-center'>
                                                <Menu as="div" className="w-full relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                            {pickedReward ? pickedReward : "Select a reward:"}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter='transition ease-out duration-100'
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                            {rewardsData.length > 0 && (
                                                            <div className="overflow-auto px-1 py-1 w-full h-40">
                                                                {rewardsData.map((reward, index) => (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${
                                                                                    active ? "bg-violet-500 text-white" : "text-gray-900"
                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                name="reward_type"
                                                                                onClick={() => {
                                                                                    setNotificationPost((prev) => ({...prev, reward: reward._id}))
                                                                                    setPickedReward(reward.reward_name)
                                                                                }}
                                                                            >
                                                                                <strong className="px-1">{reward.reward_name}</strong>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                ))}
                                                            </div>
                                                            )}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>

                                            <div className='mt-5 flex flex-row justify-center items-center text-center gap-3'>
                                                <input 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={handleCheckboxChange}
                                                    checked={wantOpen}
                                                />

                                                {!wantOpen ? (
                                                    <h1>Do you want to schedule this notification?</h1>
                                                ) : (
                                                    <input
                                                        type="datetime-local"
                                                        id="datetime"
                                                        name="datetime"
                                                        className='w-3/4 input-style'
                                                        value={dateTime}
                                                        onChange={handleDateTimeChange}
                                                        required
                                                    />
                                                )}                                              
                                            </div>

                                            <div className='mt-12 p-1 text-center'>
                                                <button
                                                    type='button'
                                                    className='w-full gradient-button'
                                                    //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                                    onClick={handleAddNotification}
                                                >
                                                    Save and Proceed
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
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
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
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="py-16 text-center text-xl font-semibold"
                            >
                                No notifications yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}