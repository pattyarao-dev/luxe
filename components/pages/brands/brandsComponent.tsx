"use client"
import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'

interface BrandCompProps {
    id: string,
    userType: string;
}

export default function BrandComp({id, userType} : BrandCompProps) {
    let [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [brands, setBrands] = useState<any[]>([]);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await fetch(`/api/allbrands?id=${id}&userType=${userType}`);
                if (response.ok) {
                    const data = await response.json();
                    setBrands(data.brands);
                } else {
                    console.error('Failed to fetch brands:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching brands:', error);
            }
        }

        fetchBrands();
    }, [id, userType]);

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>, item: string) {
        if (event.target.checked) {
            setCheckedItems(prevState => [...prevState, item]);
        } else {
            setCheckedItems(prevState => prevState.filter(checkedItem => checkedItem !== item));
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 p-20">
            <h1 className="w-full px-10 text-3xl font-bold text-center">Brands</h1>
            <div className="w-full flex flex-wrap justify-center gap-6">
                {brands.map((brand, index) => (
                    <div key={index} className="w-96 rounded overflow-hidden shadow-lg">
                        <Link href={`/brandprofile?id=${brand._id}`} passHref>
                            <Image className="w-full" width={500} height={500} src="/lv.png" alt="Sunset in the mountains"></Image>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{brand.brand_name}</div>
                                <p className="text-gray-700 text-base">{brand.brand_desc}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='py-2'>
                <button onClick={openModal} className='w-fit px-5 py-2 gradient-button'>Add a Brand</button>
            </div>

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
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as="h1"
                                        className='text-3xl font-bold leading-6 text-gray-900'
                                    >
                                        Add a Brand
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Fill out the form below to add a new brand:
                                        </p>
                                    </div>

                                    <div className='mt-6 justify-center items-center text-center'>
                                        <input type="text" className='w-80 outlined-button' placeholder='Brand name'/>
                                    </div>

                                    <div className='mt-5 justify-center items-center text-center'>
                                        <input type="text" className='w-80 outlined-button' placeholder='Brand description'/>
                                    </div>

                                    <div className='mt-5 justify-center items-center text-center'>
                                        <Menu as="div" className="w-80 relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="outlined-button inline-flex w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                    Select brand tags
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
                                                        {["Brand Tag 1", "Brand Tag 2"].map((item, index) => (
                                                            <Menu.Item key={index}>
                                                                {({ active }) => (
                                                                <button
                                                                    disabled
                                                                    className={`${
                                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    <input 
                                                                        type="checkbox" 
                                                                        value={item}
                                                                        checked={checkedItems.includes(item)}
                                                                        onChange={(event) => handleCheckboxChange(event, item)}
                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                                    />
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
                                            Add Brand
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