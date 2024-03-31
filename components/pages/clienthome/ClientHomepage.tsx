"use client"

import React, { useState, useEffect } from "react"
import { RewardTypes } from "@/app/types/rewardTypes"
import { ObjectId } from "mongoose"
import { RewardCard } from "./RewardCard"
import SearchBar from "@/components/reusable/searchbar"
import { IoSearch } from "react-icons/io5"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

export const ClientHomepage = ({ user }: { user: ObjectId }) => {
    const [unclaimedRewards, setUnclaimedRewards] = useState<RewardTypes[]>([])
    const [recommendedRewards, setRecommendedRewards] = useState<RewardTypes[]>(
        []
    )
    const [showRewards, setShowRewards] = useState<string>("ALL REWARDS")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
    const filteredRewards = unclaimedRewards.filter(
        (reward) =>
            reward.reward_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reward.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredRecommendedRewards = recommendedRewards.filter(
        (reward) =>
            reward.reward_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reward.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const fetchUnclaimedRewards = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reward/unclaimed?id=${user}`
                )
                const data = await response.json()
                setUnclaimedRewards(data.unclaimed_rewards)
            } catch (error) {
                console.error("Error fetching subscriptions:", error)
            }
        }

        fetchUnclaimedRewards()
    }, [])

    useEffect(() => {
        const fetchRecommendedRewards = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reward/recommend?id=${user}`
                )
                const data = await response.json()
                setRecommendedRewards(data.unclaimed_rewards)
            } catch (error) {
                console.error("Error fetching subscriptions:", error)
            }
        }

        fetchRecommendedRewards()
    }, [])

    const saveReward = async (rewardId: ObjectId) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reward/save?client=${user}&reward=${rewardId}`,
                {
                    method: "PATCH"
                }
            )
            const data = await res.json()
            console.log(data.message)
        } catch (error) {
            console.error("Error saving reward:", error)
        }
    }

    const uniqueBrands = Array.from(
        new Set(filteredRewards.map((reward) => reward.brand_name))
    )

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full p-4 flex flex-col gap-4">
                <h1 className="w-full text-2xl font-bold">Browse Rewards</h1>
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
                <div className="mt-2 w-full flex justify-evenly">
                    <button
                        className={`font-bold ${
                            showRewards === "ALL REWARDS"
                                ? "text-dark-purple"
                                : "text-neutral-300"
                        }`}
                        onClick={() => setShowRewards("ALL REWARDS")}
                    >
                        All Rewards
                    </button>
                    <button
                        className={`text-dark-purple font-bold ${
                            showRewards === "RECOMMENDED"
                                ? "text-dark-purple"
                                : "text-neutral-300"
                        }`}
                        onClick={() => setShowRewards("RECOMMENDED")}
                    >
                        Recommended for You
                    </button>
                </div>
            </div>
            <p className="w-full px-4 py-2 text-neutral-400 text-xs">
                Showing results for "{searchTerm}"
            </p>
            {showRewards === "ALL REWARDS" ? (
                <div className="w-full h-[65vh] overflow-y-auto p-4 flex flex-col gap-3">
                    {filteredRewards.map((reward, index) => (
                        <div key={index} className="w-full h-full">
                            <RewardCard
                                id={reward._id}
                                reward_name={reward.reward_name}
                                brand_name={reward.brand_name}
                                img_url={reward.img_url}
                                userId={user}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-[65vh] overflow-y-auto p-4 flex flex-col gap-3">
                    {filteredRecommendedRewards.map((reward, index) => (
                        <div key={index} className="w-full h-full">
                            <RewardCard
                                id={reward._id}
                                reward_name={reward.reward_name}
                                brand_name={reward.brand_name}
                                img_url={reward.img_url}
                                userId={user}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
