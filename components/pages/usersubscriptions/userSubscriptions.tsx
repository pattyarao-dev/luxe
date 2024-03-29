"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ObjectId } from "mongoose"
import Brand from "@/app/(models)/Brand"
import { BrandTypes } from "@/app/types/brandTypes"
import Link from "next/link"

export const UserSubscriptions = ({ userId }: { userId: string }) => {
    const [subscriptions, setSubscriptions] = useState<BrandTypes[]>([])

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/follow/brands?id=${userId}`
                )
                const data = await response.json()
                setSubscriptions(data.following_brands || [])
            } catch (error) {
                console.error("Error fetching subscriptions:", error)
            }
        }

        fetchSubscriptions()
    }, [])

    const handleSubscription = async (brandId: ObjectId) => {
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
            setSubscriptions((prevSubscriptions) =>
                prevSubscriptions.filter((brand) => brand._id !== brandId)
            )
        } catch (error) {
            console.error("Error encountered.", error)
        }
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {subscriptions.map((brand, index) => (
                <div
                    key={index}
                    className="w-full bg-white border rounded-lg drop-shadow-md"
                >
                    <div className="w-full h-[300px] flex flex-col items-center justify-start gap-2">
                        <div className="w-full h-1/2">
                            <Image
                                src="/lv.png"
                                width={500}
                                height={500}
                                alt="brand image"
                                className="w-full h-full object-cover object-top rounded-t-md"
                            />
                        </div>
                        <div className="w-full p-4 flex flex-col gap-4 justify-center">
                            <Link
                                href={`/brandprofile/${brand._id}`}
                                className="w-full flex flex-col gap-6"
                            >
                                <div className="w-full flex justify-start gap-2 overflow-x-auto">
                                    {brand.brand_tags.map((tag) => (
                                        <p className="w-fit px-2 py-[2px] bg-gray-main text-neutral-100 font-semibold uppercase rounded-full text-xs">
                                            {tag}
                                        </p>
                                    ))}
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="w-full ">
                                        <p className="text-lg text-dark-pink font-bold">
                                            {brand.brand_name}
                                        </p>

                                        <p className="text-gray-main">
                                            {brand.total_fcount} followers
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleSubscription(brand._id)
                                        }
                                        className="w-fit px-3 py-1 border border-dark-pink rounded-lg text-xs"
                                    >
                                        Unsubscribe
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
