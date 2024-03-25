import React from "react"
import { RewardTypes } from "@/app/types/rewardTypes"
import Image from "next/image"
import { ObjectId } from "mongoose"
import Rewards from "@/app/(models)/Rewards"
import Link from "next/link"
import { getTokenContent } from "@/app/(services)/frontend/get_token"
import RewardActions from "@/components/reusable/rewardActions"
import { FaArrowLeft } from "react-icons/fa6"
import { FaCalendar } from "react-icons/fa"

// async function getReward(id: number) {
//   const res = await fetch(`http://localhost:4000/rewards/${id}`);
//   return res.json();
// }

async function getReward(id: ObjectId) {
    try {
        const reward = await Rewards.findById(id).exec()
        return reward
    } catch (error) {
        console.error("Error fetching rewards", error)
        return
    }
}

export default async function Reward({ params }: { params: RewardTypes }) {
    const token_content = getTokenContent()
    const qr_content = { client_id: token_content._id, reward_id: params.id }
    const qr_string = `${qr_content.client_id}-${qr_content.reward_id}`
    const reward = await getReward(params.id)
    return (
        <main className="w-full h-full flex flex-col gap-10">
            {reward && (
                <div className="w-full flex flex-col">
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

                    <div className="w-full py-10 px-6 flex flex-col gap-6">
                        <div className="w-full">
                            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-dark-purple to-dark-pink">
                                {reward.reward_name}
                            </h1>
                            <Link href={`/brandprofile/${reward.brand_id}`}>
                                <h3 className="text-sm font-semibold">
                                    {reward.brand_name}
                                </h3>
                            </Link>
                        </div>

                        <div>
                            <p className="text-justify">{reward.reward_desc}</p>
                        </div>
                        <div className="w-full p-2 border border-dark-pink bg-white rounded-md text-dark-purple drop-shadow-md flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl uppercase font-semibold">
                                    Claim before
                                </h1>
                            </div>
                            {/* <p className="text-dark-pink font-bold">{reward.start} to {reward.end}</p> */}
                            <p>
                                {new Date(reward.expiry)
                                    .toLocaleString()
                                    .slice(0, 10)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full h-[38vh] p-4 flex flex-col gap-2">
                <RewardActions qr_string={qr_string} />
            </div>
        </main>
    )
}
