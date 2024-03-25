"use client"
import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaTags } from 'react-icons/fa'

interface Brand {
    _id: string;
    brand_name: string;
    brand_desc: string;
}

interface BrandCompProps {
    id: string,
    userType: string;
}

export default function BrandComp({id, userType} : BrandCompProps) {
    console.log(id)
    console.log(userType)
    let [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await fetch(`/api/allbrands?id=${id}&userType=${userType}`);
                if (response.ok) {
                    const data = await response.json();
                    const modifiedBrands = data.brands.map((brand: Brand) => ({
                        ...brand,
                        brand_desc: brand.brand_desc.split(/[.!?]/)[0] // Split by '.', '!', or '?', and take the first part
                    }));
                    setBrands(modifiedBrands);
                } else {
                    console.error('Failed to fetch brands:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching brands:', error);
            }
        }

        async function fetchTags() {
            try {
                const response = await fetch(`/api/tags`);
                if (response.ok) {
                    const data = await response.json();
                    // Assuming 'Objecttags' property exists and is an array
                    setTags(data.tags);
                } else {
                    console.error('Failed to fetch tags:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching tags:', error);
            }
        }

        fetchBrands();
        fetchTags();
    }, [id, userType]);

    console.log(tags)

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    function handleCheckboxChange(item: string) {
        setCheckedItems(prevState => {
            if (prevState.includes(item)) {
                console.log(`Unchecked:  ${item}`);
                return prevState.filter(checkedItem => checkedItem !== item);
            } else {
                console.log(`Checked:   ${item}`)
                return [...prevState, item];
            }
        });
    }

    console.log(checkedItems)

    const [brandData, setBrandData] = useState({
        brand_name: '',
        brand_desc: '',
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setBrandData(prev => ({ ...prev, [name]: value }));
        console.log(brandData)
    }

    function handleAddBrand() {
        // Prepare data for the POST request
        const postData = {
            brand_name: brandData.brand_name,
            brand_desc: brandData.brand_desc,
            brand_tags: checkedItems,
        };

        console.log(postData)
    
        // Send POST request to add the brand
        fetch(`/api/brand?id=${id}`, {
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
                console.error('Failed to add brand:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error while adding brand:', error);
        });
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 p-20">
            <h1 className="w-full px-10 text-4xl font-bold text-center">Brands</h1>
            <div className="w-full flex flex-wrap justify-center gap-6">
                {brands.map((brand, index) => (
                    <div key={index} className="w-96 rounded overflow-hidden shadow-lg">
                        <Link href={`/brandprofile?id=${brand._id}&userType=${userType}`} passHref>
                            <Image className="w-full" width={500} height={500} src="/lv.png" alt="Sunset in the mountains"></Image>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{brand.brand_name}</div>
                                <p className="text-gray-700 text-base">{brand.brand_desc}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {userType === 'ADMIN_ALL' && (
                <div className='py-2'>
                    <button onClick={openModal} className='w-fit px-5 py-2 gradient-button'>Add a Brand</button>
                </div> 
            )}
            

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
                                        <input 
                                            type="text" 
                                            className='w-80 outlined-button' 
                                            name='brand_name'
                                            placeholder='Brand name'
                                            value={brandData.brand_name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className='mt-5 justify-center items-center text-center'>
                                        <input 
                                            type="text" 
                                            className='w-80 outlined-button' 
                                            name='brand_desc'
                                            placeholder='Brand description'
                                            value={brandData.brand_desc}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className='mt-5 justify-center items-center text-center'>
                                        <Menu as="div" className="w-80 relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
                                                    {tags.length > 0 && (
                                                    <div className="overflow-auto px-1 py-1 w-full h-40">
                                                        {tags.map((item, index) => (
                                                            <Menu.Item key={index}>
                                                                {({ active }) => (
                                                                <div
                                                                    className={`${
                                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                    } overflow-auto group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    <input 
                                                                        type="checkbox" 
                                                                        value={item}
                                                                        checked={checkedItems.includes(item)}
                                                                        onChange={() => handleCheckboxChange(item)}
                                                                        onClick={(event) => event.stopPropagation()}
                                                                        className="input-style w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                                    />
                                                                    <strong className='px-1'>{item}</strong>
                                                                </div>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </div>
                                                    )}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>

                                    <div className='mt-5 mb-1 text-center'>
                                        <button
                                            type='button'
                                            className='w-80 px-5 py-2 gradient-button'
                                            //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={handleAddBrand}
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