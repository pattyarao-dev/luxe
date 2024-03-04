"use client"
import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'

export default function UserManagementComp() {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }
    
    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 p-20">
            <h1 className="w-full px-10 text-4xl font-bold text-center">Brand 1</h1>
            <div className='w-1/3 flex flex-row gap-4'>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:branch</button>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>sort:type</button>
            </div>
            <div className='px-10 py-10'>
                There are no active users for this brand
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
                                        <input type="text" className='w-48 outlined-button' placeholder='First name'/>
                                        <input type="text" className='w-48 outlined-button' placeholder='Last name'/>
                                    </div>

                                    <div className='mt-4 justify-center items-center text-center'>
                                        <input type="text" className='w-96 outlined-button' placeholder='Username'/>
                                    </div>

                                    <div className='mt-4 justify-center items-center text-center'>
                                        <input type="text" className='w-96 outlined-button' placeholder='Email'/>
                                    </div>

                                    <div className='mt-4 justify-center items-center text-center'>
                                        <input type="text" className='w-96 outlined-button' placeholder='Password'/>
                                    </div>

                                    <div className='mt-4 justify-center items-center text-center'>
                                        <Menu as="div" className="w-96 relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="outlined-button inline-flex w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
                                                        {["Client", "Admin All", "Admin", "Cashier"].map((item, index) => (
                                                            <Menu.Item key={index}>
                                                                {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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

                                    <div className='mt-6 p-1 text-center'>
                                        <button
                                            type='button'
                                            className='w-80 gradient-button'
                                            //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={closeModal}
                                        >
                                            Add User
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