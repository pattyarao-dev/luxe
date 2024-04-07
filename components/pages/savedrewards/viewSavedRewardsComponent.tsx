"use client"

import { RewardTypes } from "@/app/types/rewardTypes"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { RewardCard } from "../clienthome/RewardCard"
import { ObjectId } from "mongoose"
import Link from "next/link"
import { IoSearch } from "react-icons/io5"
import { LoadingComponent } from "@/components/reusable/LoadingComponent"

export const UserSavedRewards = ({ userId }: { userId: ObjectId }) => {
    const [savedRewards, setSavedRewards] = useState<RewardTypes[]>([])
    useEffect(() => {
        const fetchSavedRewards = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reward/save/view?id=${userId}`
                )
                const data = await response.json()
                setSavedRewards(data.saved_rewards)
            } catch (error) {
                console.error("Error fetching favorites:", error)
            }
        }

        fetchSavedRewards()
    }, [userId])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
    const filteredRewards = savedRewards.filter(
        (reward) =>
            reward.reward_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reward.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full flex flex-col gap-6">
            {filteredRewards ? (
                <>
                    <div className="w-full flex items-center gap-2 border-2 p-3 rounded-lg border-dark-pink bg-white drop-shadow-lg">
                        <IoSearch className="text-dark-pink" />
                        <input
                            type="text"
                            className="appearance-none focus:outline-none grow text-sm"
                            placeholder="Search a reward..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="w-full h-[69vh] overflow-y-auto flex flex-col gap-4">
                        {filteredRewards.map((reward, index) => (
                            <Link href={`/reward/${reward._id}`}>
                                <div key={index}>
                                    <RewardCard
                                        id={reward._id}
                                        reward_name={reward.reward_name}
                                        brand_name={reward.brand_name}
                                        userId={userId}
                                        img_url={reward.img_url}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <LoadingComponent />
                    <p>Loading</p>
                </div>
            )}
        </div>
    )
}
