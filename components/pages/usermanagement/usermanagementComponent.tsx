"use client"
import React, { Fragment, useState, useEffect } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'
import UserCard from '@/components/reusable/userCard'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

interface User {
    _id: string;
    first_name: string;
    last_name: string;
    user_type: string;
}

interface APIResponse {
    status: number;
    data: User[];
}

export default function UserManagementComp() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id)

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    const [usersData, setUsersData] = useState<User[]>([]);
    const [addUserData, setAddUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        user_type: '',
        assigned_brand: id,
    })

    useEffect(() => {
        async function fetchUsersData() {
            try {
                const response = await fetch(`/api/user/brandusers?id=${id}`);
                if (response.ok) {
                    const data: APIResponse = await response.json();
                    setUsersData(data.data);
                } else {
                    console.error('Failed to fetch users data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching users data:', error);
            }
        }

        if (id){
            fetchUsersData(); 
        }
    }, [id]);

    if (!usersData || usersData.length === 0) {
        return <div>Loading...</div>;
    }

    console.log(usersData)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAddUserData(prev => ({ ...prev, [name]: value }));
        console.log(addUserData)
    }

    function handleAddUser() {
        // Prepare data for the POST request
        const postData = {
            first_name: addUserData.first_name,
            last_name: addUserData.last_name,
            username: addUserData.username,
            email: addUserData.email,
            password: addUserData.password,
            user_type: addUserData.user_type,
            assigned_brand: addUserData.assigned_brand,
        };

        console.log(postData)
    
        // Send POST request to add the brand
        fetch(`/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => {
            if (response.ok) {
                // Brand added successfully, close the modal or perform any other actions
                closeModal();
            } else {
                // Handle errors if any
                console.error('Failed to add user:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error while adding user:', error);
        });
    }
    
    return (
            <div className="w-full flex flex-col justify-center items-center gap-8 p-20">
                <h1 className="w-full px-10 text-4xl font-bold text-center">Brand 1</h1>
                <div className='w-1/3 flex flex-row gap-4'>
                    <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:branch</button>
                    <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:type</button>
                </div>
                <div className='w-full px-64'>
                {usersData.map((user) => (
                    <UserCard
                        key={user._id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        user_type={user.user_type}
                    />
                ))}

                </div>
                <button className='px-20 outlined-button' onClick={openModal}>ADD USER</button>

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
                                            Add a User
                                        </Dialog.Title>
                                        <div className='mt-2'>
                                            <p className='text-sm text-gray-500'>
                                                Fill out the form below to add a new user:
                                            </p>
                                        </div>

                                        <div className='mt-6 flex flex-row justify-center items-center text-center gap-1'>
                                            <input 
                                                type="text" 
                                                className='w-48 input-style' 
                                                placeholder='First name'
                                                name='first_name'
                                                value={addUserData.first_name}
                                                onChange={handleChange}
                                            />
                                            <input 
                                                type="text" 
                                                className='w-48 input-style' 
                                                placeholder='Last name'
                                                name='last_name'
                                                value={addUserData.last_name}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='mt-4 justify-center items-center text-center'>
                                            <input 
                                                type="text" 
                                                className='w-96 input-style' 
                                                placeholder='Username'
                                                name='username'
                                                value={addUserData.username}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='mt-4 justify-center items-center text-center'>
                                            <input 
                                                type="text" 
                                                className='w-96 input-style' 
                                                placeholder='Email'
                                                name='email'
                                                value={addUserData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='mt-4 justify-center items-center text-center'>
                                            <input 
                                                type="text" 
                                                className='w-96 input-style' 
                                                placeholder='Password'
                                                name='password'
                                                value={addUserData.password}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='mt-4 justify-center items-center text-center'>
                                            <Menu as="div" className="w-96 relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                        Select User Type:
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
                                                    <Menu.Items className="right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                        <div className="px-1 py-1 ">
                                                            {["ADMIN", "CASHIER"].map((item, index) => (
                                                                <Menu.Item key={index}>
                                                                    {({ active }) => (
                                                                    <button
                                                                        className={`${
                                                                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                        name='user_type'
                                                                        onClick={() => {
                                                                            setAddUserData(prev => ({ ...prev, user_type: item}))
                                                                        }}
                                                                    >
                                                                        <strong className='px-1'>{item}</strong>
                                                                    </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>

                                        <div className='mt-5 text-center'>
                                            <button
                                                type='button'
                                                className='w-96 px-5 py-2 gradient-button'
                                                //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                                onClick={handleAddUser}
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
    )
}