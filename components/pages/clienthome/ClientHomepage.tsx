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
            reward.brand_name.toLowerCase()
        //     .includes(searchTerm.toLowerCase()) ||
        // (selectedBrand && reward.brand_name === selectedBrand)
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
        <div className="w-full min-h-screen">
            <div className="w-full p-4 flex flex-col gap-4">
                <h1 className="w-full text-2xl font-bold">Browse Rewards</h1>
                <div className="w-full flex flex-col gap-4">
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
                    {/* <div className="w-full relative">
                        <p
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className={`w-1/2 p-2 bg-gray-200 flex justify-between items-center ${
                                openDropdown ? "rounded-t-md" : "rounded-md"
                            }`}
                        >
                            <span>Select brand</span>
                            {openDropdown ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )}
                        </p>
                        <div
                            className={`w-1/2 absolute top-full left-0 bg-white rounded-b-md ${
                                openDropdown ? "block" : "hidden"
                            }`}
                            style={{ zIndex: 10 }}
                        >
                            <div className="max-h-48 overflow-y-auto">
                                {uniqueBrands.map((brand, index) => (
                                    <p
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                                        onClick={() => setSelectedBrand(brand)}
                                    >
                                        {brand}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {filteredRewards ? (
                <div className="w-full h-[70vh] overflow-y-auto p-4 flex flex-col gap-3">
                    {filteredRewards.map((reward, index) => (
                        <div key={index} className="w-full h-full">
                            <RewardCard
                                id={reward._id}
                                reward_name={reward.reward_name}
                                brand_name={reward.brand_name}
                                userId={user}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading rewards</p>
            )}
        </div>
    )
}
