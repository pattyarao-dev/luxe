"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BrandTypes } from "@/app/types/brandTypes"
import { RewardTypes } from "@/app/types/rewardTypes"
import { ObjectId } from "mongoose"
import { RewardCard } from "../clienthome/RewardCard"
import Link from "next/link"

export const ClientBrandProfile = ({
    brandId,
    userId,
    isFollowing
}: {
    brandId: string
    userId: string
    isFollowing: boolean
}) => {
    const [brand, setBrand] = useState<BrandTypes>()
    const [rewards, setRewards] = useState<RewardTypes[]>()

    const sections = ["Rewards", "About"]
    const [selectedSection, setSelectedSection] = useState<string>("Rewards")

    const [isSubscribed, setSubscribe] = useState<boolean>(isFollowing)
    useEffect(() => {
        async function getBrand() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/allbrands/selected?id=${brandId}`
                )
                const data = await res.json()
                console.log(data)
                setBrand(data.data)

                const rewardRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/merchantrewards?id=${brandId}`
                )
                const rewardsData = await rewardRes.json()
                setRewards(rewardsData.data)
            } catch (error) {
                console.error("error fetching brand")
            }
        }

        if (brandId) {
            getBrand()
        }
    }, [brandId])

    const handleSubscription = async (brandId: string, userId: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/follow?brand=${brandId}&client=${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        brand: brandId,
                        client: userId
                    })
                }
            )

            if (!response.ok) {
                throw new Error("Failed to update subscription")
            }

            const data = await response.json()
            setSubscribe(!isFollowing)
            // Assuming the response contains the updated list of subscriptions
        } catch (error) {
            console.error("Error encountered.", error)
        }
    }

    return (
        <main className="w-full min-h-screen flex flex-col gap-16 primary-background">
            {brand && (
                <div className="w-full h-full">
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full h-32">
                            <img
                                src={brand.img_url}
                                alt=""
                                className="w-full h-full object-cover brightness-50"
                            />
                        </div>
                        <div className="w-full p-4 flex flex-col gap-6">
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-2xl font-bold">
                                    {brand.brand_name}
                                </p>
                                <p>{brand.total_fcount} Followers</p>
                            </div>
                            <div className="w-full">
                                {isSubscribed === false ? (
                                    <button
                                        onClick={() =>
                                            handleSubscription(brandId, userId)
                                        }
                                        className="w-full bg-gradient-to-br from-purple to-dark-pink text-white py-2 rounded-md font-semibold uppercase text-sm"
                                    >
                                        Subscribe
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleSubscription(brandId, userId)
                                        }
                                        className="w-full bg-midnight-blue text-white py-2 rounded-md font-semibold uppercase text-sm"
                                    >
                                        Subscribed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-4">
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex gap-6">
                                {sections.map((section, index) => (
                                    <button
                                        key={index}
                                        className={`font-bold uppercase ${
                                            selectedSection === section
                                                ? "text-dark-pink"
                                                : "text-black"
                                        }`}
                                        onClick={() =>
                                            setSelectedSection(section)
                                        }
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>
                            <hr className="w-full border-[0.5px] border-neutral-200" />
                        </div>
                    </div>

                    {selectedSection === "Rewards" ? (
                        <div className="w-full h-[50vh] px-4 py-2 overflow-y-auto flex flex-col gap-4">
                            {rewards ? (
                                rewards.map((reward, index) => (
                                    <div
                                        key={index}
                                        className="w-full p-4 bg-white flex flex-col gap-2 rounded-md drop-shadow-md"
                                    >
                                        <Link href={`/reward/${reward._id}`}>
                                            <p className="text-lg font-bold text-dark-pink">
                                                {reward.reward_name}
                                            </p>
                                        </Link>
                                        <p className="text-sm">
                                            {reward.reward_desc}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Loading rewards</p>
                            )}
                        </div>
                    ) : (
                        <p className="w-full h-[50vh] px-4 py-2 overflow-y-auto flex flex-col gap-4 text-justify">
                            {brand.brand_desc}
                        </p>
                    )}
                </div>
            )}
        </main>
    )
}
