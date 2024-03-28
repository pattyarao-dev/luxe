"use client"

import React, { useState } from "react"
import { RewardTypes } from "@/app/types/rewardTypes"
import { ObjectId } from "mongoose"
import { RewardCard } from "./RewardCard"
import SearchBar from "@/components/reusable/searchbar"
import { IoSearch } from "react-icons/io5"

export const ClientHomepage = ({
    rewards,
    user
}: {
    rewards: RewardTypes[]
    user: { _id: ObjectId }
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
    const filteredRewards = rewards.filter((reward) =>
        reward.reward_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="w-full p-4 flex flex-col gap-3">
                {/* <SearchBar onSearch={handleSearch} /> */}
                <div className="w-full">
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
                </div>
                <h1 className="w-full text-2xl font-semibold">
                    Browse Rewards
                </h1>
            </div>

            <div className="w-full h-[75vh] p-4 flex flex-col gap-3 overflow-y-auto">
                {filteredRewards.map((reward, index) => (
                    <div key={index} className="w-full h-full">
                        <RewardCard
                            id={reward._id}
                            reward_name={reward.reward_name}
                            brand_name={reward.brand_name}
                            userId={user._id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
