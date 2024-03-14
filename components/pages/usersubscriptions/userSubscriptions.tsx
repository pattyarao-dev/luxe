"use client"

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { ObjectId } from 'mongoose';
import Brand from '@/app/(models)/Brand';
import { BrandTypes } from '@/app/types/brandTypes';
import Link from 'next/link';

export const UserSubscriptions = ({userId}: {userId: string}) => {

  const [subscriptions, setSubscriptions] = useState<BrandTypes[]>([])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/brands?id=${userId}`);
        const data = await response.json();
        setSubscriptions(data.following_brands);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      {subscriptions.map((brand, index) => (
        // <div>{brand.brand_name}</div>
        
          <div key={index} className="bg-white border border-dark-purple rounded-lg flex flex-col gap-1 px-3 py-4">
             <Link href={`/brandprofile/${brand._id}`}>
                <div className="w-full flex items-center justify-between">
                  <div className="p-2 grow">
                    <Image src="/cuate.png" width={70} height={40} alt="brand image" className="w-full object-cover"/>
                  </div>
                  <div className="flex flex-col gap-2 p-4 justify-between">
                    <div className="w-full flex justify-start gap-2">
                      {brand.brand_tags.map((tag) => (
                      <p className="w-fit px-2 py-1 bg-gray-main/40 text-neutral-400 font-semibold rounded-sm text-xs">{tag}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-lg text-dark-pink font-bold">{brand.brand_name}</p>
                      <p className="text-gray-main">{brand.total_fcount} followers</p>
                    </div>
                    <div className="w-full flex gap-4 text-sm">
                      <button className="px-3 py-0.5 bg-gradient-to-br from-purple to-midnight-blue text-white rounded-lg">Notify Me</button>
                      <button className="px-3 py-0.5 border border-dark-pink rounded-lg">Unsubscribe</button>
                    </div>
                  </div>
                </div>
             </Link>
          </div> 
      ))}
    </div>
  )
}
