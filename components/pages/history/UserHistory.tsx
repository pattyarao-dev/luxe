"use client"

import { RewardTypes } from '@/app/types/rewardTypes'
import { ObjectId } from 'mongoose'
import React, {useState, useEffect} from 'react'
import { RewardCard } from '../clienthome/RewardCard'

export const UserHistory = ({user}: {user: ObjectId}) => {

    const [claimedRewards, setClaimedRewards] = useState<RewardTypes[]>([])
    useEffect(() => {
        const fetchClaimedRewards = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reward/claimed?id=${user}`
                )
                const data = await response.json()
                setClaimedRewards(data.claimed_rewards)
            } catch (error) {
                console.error("Error fetching subscriptions:", error)
            }
        }

        fetchClaimedRewards()
    }, [])



  return (
    <div className="w-full h-[70vh] overflow-y-auto flex flex-col gap-4">
        
            {claimedRewards.map((reward) => (
         <RewardCard
                            id={reward._id}
                            reward_name={reward.reward_name}
                            brand_name={reward.brand_name}
                            userId={user}
                        />
    ))}
    </div>
  )
}
