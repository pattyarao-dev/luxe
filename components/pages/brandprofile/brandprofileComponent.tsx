"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function BrandProfileComp() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id)

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

    if (!brandData) {
        return <div>Loading...</div>;
    }

    const { data } = brandData;

    return (
    <div className="w-full flex flex-row justify-center gap-8 px-20 py-20">
        <div className='w-full'>
            <div className='w-full flex flex-row justify-between'>
                    <h1 className="text-3xl font-bold">{data.brand_name}</h1>
                    <div className='flex gap-2'>
                        <button className='px-5 gradient-button'>View Rewards</button>
                        <button className='px-5 outlined-button'>User Management</button>
                    </div>
            </div>
            <div className='w-full py-4'>
                <p className='w-fit'>{data.brand_desc}</p>
            </div>
            <div className='w-full py-4 flex flex-row justify-between'>
                <h1 className="text-3xl font-bold">Branches</h1>
                <button className='px-5 outlined-button'>Add a Branch</button>
            </div>
        </div>
        <div className='w-full rounded items-center border-solid border-2 px-10 py-4 gradient-background'>
            <h1 className='text-center text-3xl font-bold'>Subscriber Count</h1>
        </div>
    </div>
    )
  }