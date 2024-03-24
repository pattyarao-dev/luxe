"use client"

import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@/components/reusable/staricon'
import { ObjectId } from 'mongoose'
import Link from 'next/link'
import { RewardTypes } from '@/app/types/rewardTypes'

// interface RewardCardProps extends RewardTypes {
//   userId: ObjectId;
// }
interface RewardCardProps {
  id: ObjectId;
  reward_name: string;
  brand_name: string;
  userId: ObjectId;
}

export const RewardCard: React.FC<RewardCardProps> = ({id, reward_name, brand_name, userId}) => {

   const saveReward = async (rewardId: ObjectId) => {
    // Call your API endpoint to save the reward
    // You may need to pass additional data to identify the user
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reward/save?client=${userId}&reward=${rewardId}`, {
        method: 'PATCH',
        // Additional options like headers and body can be added here
      });
      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error saving reward:', error);
    }
  };

  const reward_id = String(id)

  return (
    <>
    <div className="reward-card">
              <div className="w-[25%] h-[90px] rounded-md flex justify-center bg-gray-main">
              <Image src="/cuate.png" width={80} height={80} alt="reward image" className="p-2"></Image>
              </div>
              <div className="w-[60%] flex flex-col gap-4">
                <Link href={`/reward/${reward_id}`}>
                  <div>
                    <h1 className="text-dark-purple text-md font-bold">{reward_name}</h1>
                    <p className="text-xs">{brand_name}</p>
                  </div>
                </Link>
              </div>
                <div className="w-[10%] flex justify-center">
                  <StarIcon onSaveReward={() => saveReward(id)}/>
                  {/* <button onClick={() => saveReward(reward.id)}>Save</button> */}
                </div>
              </div>
    </>
  )
}
