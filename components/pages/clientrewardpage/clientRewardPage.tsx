import React from "react"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa"
import { IoIosCheckmark } from "react-icons/io"
import { RewardTypes } from "@/app/types/rewardTypes"

import Link from "next/link"

export const ClientRewardPage = ({ reward }: { reward: RewardTypes }) => {
    function dateToWords(date: Date) {
        // Array of month names
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]

        // Extract day, month, and year from the date object
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        // Return the date in words format
        return `${month} ${day}, ${year}`
    }

    // Get the expiry date in words format
    const expiryDateInWords = dateToWords(new Date(reward.expiry))
    return (
        <div className="w-full">
            <div className="w-full">
                <Image
                    src="/reward-stockimage.jpg"
                    width={300}
                    height={300}
                    alt="stock image"
                    className="w-full h-52 object-cover object-top brightness-50"
                />
                <Link href="/home">
                    <div className="absolute top-60 w-full p-4 flex items-center gap-1 font-bold text-white drop-shadow-md">
                        <FaArrowLeft />
                        <p>Go back</p>
                    </div>
                </Link>
            </div>

            <div className="w-full p-5">
                <div className="w-full p-5 flex flex-col gap-4 bg-white drop-shadow-md rounded-md">
                    <div className="w-full">
                        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-dark-purple to-dark-pink">
                            {reward.reward_name}
                        </h1>
                        <Link href={`/brandprofile/${reward.brand_id}`}>
                            <h3 className="text-lg font-semibold">
                                {reward.brand_name}
                            </h3>
                        </Link>
                    </div>

                    <div className="w-full flex flex-col gap-8">
                        <p className="text-justify italic">
                            {reward.reward_desc}
                        </p>
                        <div className="w-full p-4 bg-neutral-100 flex flex-col gap-8 rounded-md drop-shadow-md">
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-yellow-600 font-bold">
                                    This reward is available in the following
                                    branches:
                                </p>
                                {reward.allowed_branches.map(
                                    (branch, index) => (
                                        <div className="ml-4 w-full flex gap-1 items-center">
                                            <IoIosCheckmark />
                                            <p key={index}>{branch}</p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div>
                                <p className="text-yellow-600 font-bold">
                                    Redemption conditions:
                                </p>
                                {reward.conditions_desc.map(
                                    (condition, index) => (
                                        <div className="ml-4 w-full flex gap-1 items-center">
                                            <IoIosCheckmark />
                                            <p key={index}>{condition}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 w-full">
                        <h1 className="text-lg uppercase font-semibold">
                            Claim before{" "}
                            <span className="px-4 py-1 rounded-md bg-neutral-200 text-yellow-600">
                                {expiryDateInWords}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
