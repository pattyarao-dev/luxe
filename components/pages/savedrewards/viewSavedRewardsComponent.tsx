"use client"

import { RewardTypes } from '@/app/types/rewardTypes';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import RewardCard from '@/components/reusable/rewardCard';


export const UserSavedRewards = ({userId}: {userId: string}) => {
    const [savedRewards, setSavedRewards] = useState<RewardTypes[]>([])
  
  

  useEffect(() => {
    const fetchSavedRewards = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reward/save/view?id=${userId}`);
        const data = await response.json();
        setSavedRewards(data.saved_rewards);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSavedRewards();
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      {savedRewards.map((reward, index) => (
        <div key={index} className="w-full border rounded-lg border-black bg-gradient-to-br from-white to-gray-main drop-shadow-lg">
            
            <div className="w-full p-4 flex flex-col gap-6">
                <div className="w-full flex items-center justify-start gap-8">
                    <div className="">
                        <Image src="/cuate.png" width={70} height={70} alt="image" className="object-cover"/>
                    </div>
                    <div className="">
                        <p>{reward.reward_name}</p>
                        <p>Expires on {new Date(reward.expiry).toLocaleString().slice(0, 10)}</p>  
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <button className="gradient-button px-4 py-2">Claim Now</button>
                </div>
            </div>
            
        </div>
        
      ))}
    </div>
  )
}
