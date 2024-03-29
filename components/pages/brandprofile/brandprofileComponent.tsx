"use client"
import React, { useEffect, useState, Fragment } from 'react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import BranchCard from '@/components/reusable/branchCard'
import {Menu, Dialog, Transition} from '@headlessui/react'

export default function BrandProfileComp() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const usertype = searchParams.get('userType')
    console.log(id)
    console.log(usertype)

    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }

    const [brandData, setBrandData] = useState<any>();
    useEffect(() => {
        async function fetchBrandData() {
            try {
                const response = await fetch(`/api/allbrands/selected/?id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBrandData(data);
                } else {
                    console.error('Failed to fetch brand data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching brand data:', error);
            }
        }

        if (id){
           fetchBrandData(); 
        }
    }, [id]);

    const [branchData, setBranchData] = useState({
        branch_name: '',
        // longt: 0,
        // lat: 0,
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setBranchData((prev) => ({ ...prev, [name]: value }))
        console.log(branchData)
    }

    function handleAddBranch() {
        const postData = {
            branch_name: branchData.branch_name,
            longt: 0,
            lat: 0,
        }
        console.log(postData)

        fetch(`/api/branch?id=${id}`, {
            method: "PATCH",
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
    }

    if (!brandData) {
        return <div>Loading...</div>;
    }

    const { data } = brandData;

    console.log(data.branches)

    return (
            <div className="w-full flex flex-row justify-center gap-8 px-20 py-20">
                <div className='w-full'>
                    <div className='w-full flex flex-row justify-between'>
                            <h1 className="text-4xl flex items-center font-bold">{data.brand_name}</h1>
                            <div className='flex gap-2'>
                                <Link 
                                    href={`/viewrewards?id=${data._id}`} 
                                    className='px-5 gradient-button flex items-center text-center' 
                                    passHref
                                >
                                    View Rewards
                                </Link>
                                <Link 
                                    href={`/usermanagement?id=${data._id}&userType=${usertype}`} 
                                    className='px-5 outlined-button flex items-center text-center' 
                                    passHref
                                >
                                    User Management
                                </Link>
                            </div>
                    </div>
                    <div className='w-full py-4'>
                        <p className='w-fit'>{data.brand_desc}</p>
                    </div>
                    <div className='w-full py-4 flex flex-row justify-between'>
                        <h1 className="text-3xl flex items-center font-bold">Branches</h1>
                        <button className='px-5 outlined-button' onClick={openModal}>Add a Branch</button>
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
                                                    Add a Branch
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <p className='text-sm text-gray-500'>
                                                        Fill out the form below to add a new branch:
                                                    </p>
                                                </div>

                                                <div className='mt-6 justify-center items-center text-center'>
                                                    <input 
                                                        type="text" 
                                                        className='w-full input-style' 
                                                        placeholder='Branch name'
                                                        name='branch_name'
                                                        value={branchData.branch_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                {/* <div className='mt-4 justify-center items-center text-center'>
                                                    <input 
                                                        type="number" 
                                                        className='w-full input-style' 
                                                        placeholder={branchData.longt === 0 ? "Longitude" : ""}
                                                        name='longt'
                                                        value={branchData.longt === 0 ? "" : branchData.longt}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className='mt-4 justify-center items-center text-center'>
                                                    <input 
                                                        type="number" 
                                                        className='w-full input-style'
                                                        placeholder={branchData.lat === 0 ? "Latitude" : ""}
                                                        name='lat'
                                                        value={branchData.lat === 0 ? "" : branchData.lat}
                                                        onChange={handleChange}
                                                    />
                                                </div> */}

                                                <div className='mt-6 p-1 text-center'>
                                                    <button
                                                        type='button'
                                                        className='w-full gradient-button'
                                                        //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                                        onClick={handleAddBranch}
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
                    <div className='flex flex-col gap-3'>
                        {data.branches.length > 0 ? (
                            data.branches.map((branch: { branch_name: string }, index: number) => (
                                <BranchCard key={index} branch_name={branch.branch_name} />
                            ))
                        ) : (
                            <h1 className='flex justify-center px-10 py-32 font-semibold'>There are no branches for this yet</h1>
                        )}
                    </div>
                    
                </div>
                <div className='w-full rounded-md items-center border-solid border-2 px-10 py-4 gradient-background'>
                    <h1 className='text-center pt-6 text-3xl font-medium'>Subscriber Count</h1>
                    <h2 className='text-center text-4xl font-bold'>{data.total_fcount}</h2>
                </div>
            </div>
    )
  }