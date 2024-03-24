"use client"

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { BrandTypes } from '@/app/types/brandTypes'
import { RewardTypes } from '@/app/types/rewardTypes'
import { ObjectId } from 'mongoose'
import { RewardCard } from '../clienthome/RewardCard'

export const ClientBrandProfile = ({ brandId, userId }: { brandId: string; userId: string }) => {

    const [brand, setBrand] = useState<BrandTypes>()
    const [rewards, setRewards] = useState<RewardTypes[]>()
    const [isSubscribed, setSubscribe] = useState<boolean>(false)
    useEffect(() => {
        async function getBrand(){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbrands/selected?id=${brandId}`)
                const data = await res.json()
                console.log(data)
                setBrand(data.data)

                const rewardRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/merchantrewards?id=${brandId}`)
                 const rewardsData = await rewardRes.json();
                setRewards(rewardsData.data);
            } catch (error){
                console.error("error fetching brand")
            }
        }

        if (brandId) {
            getBrand()
        }
    }, [brandId])

     const handleSubscription = async (brandId: string, userId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow?brand=${brandId}&client=${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brand: brandId,
                client: userId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update subscription');
        }

        const data = await response.json();
        setSubscribe(true);
        // Assuming the response contains the updated list of subscriptions
    } catch (error) {
        console.error("Error encountered.", error);
    }
}
    
  return (
    
    <main className="w-full min-h-screen flex flex-col gap-16">
        <div className="w-full h-32 bg-dark-purple flex justify-center">
            <div className="absolute w-[150px] drop-shadow-sm top-32">
                <img src="/cuate.png" alt="" className="w-full p-4 object-cover rounded-full bg-white" />
            </div>
        </div>
        {brand && (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
                <p className='text-2xl font-bold'>{brand.brand_name}</p>
                <p>Subscribers: {brand.total_fcount}</p>
                {isSubscribed === false ? (<button onClick={() => handleSubscription(brandId, userId)} className="gradient-button">Subscribe</button>): <button onClick={() => handleSubscription(brandId, userId)} className="gradient-button">Subscribed!</button>}
            </div>
            <div className="w-full p-4 flex flex-col gap-4">
                <hr className="w-full border border-dark-purple"/>
                 <div className="w-full flex flex-col gap-4">
                    {rewards && rewards.map((reward, index) => (
                    <div key={index} className="w-full p-2 bg-white border border-gray-main rounded-md">
                        <p className="text-lg font-bold text-dark-pink">{reward.reward_name}</p>
                        <p>{reward.reward_desc}</p>
                    </div>
                ))}
                 </div>
            </div>
        </div>
        )}
        
    </main>
  )
}
