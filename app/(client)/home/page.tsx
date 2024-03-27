import Image from "next/image"
import { IoIosStarOutline } from "react-icons/io"
import SearchBar from "@/components/reusable/searchbar"
import Link from "next/link"
import Rewards from "@/app/(models)/Rewards"
import { getTokenContent } from "../../(services)/frontend/get_token"
import { StarIcon } from "@/components/reusable/staricon"
import { ObjectId } from "mongoose"
import { RewardCard } from "@/components/pages/clienthome/RewardCard"

// async function getRewards() {
//   const res = await fetch(`http://localhost:4000/rewards`);
//   return res.json();
// }
async function getRewards() {
    try {
        const rewards = await Rewards.find().exec()
        return rewards
    } catch (error) {
        console.error("Error fetching rewards", error)
        return []
    }
}

export default async function Home() {
    // console.log(getTokenContent());
    const user = getTokenContent()
    const { _id, user_type } = user

    const rewards = await getRewards()

    const saveReward = async (rewardId: ObjectId) => {
        // Call your API endpoint to save the reward
        // You may need to pass additional data to identify the user
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reward/save?client=${user._id}&reward=${rewardId}`,
                {
                    method: "PATCH"
                    // Additional options like headers and body can be added here
                }
            )
            const data = await res.json()
            console.log(data.message)
        } catch (error) {
            console.error("Error saving reward:", error)
        }
    }

    return (
        <main className="w-full">
            <div>
                <SearchBar />
            </div>
            <div className="w-full p-4 flex flex-col gap-4">
                <h1 className="w-full text-2xl font-semibold">
                    Browse Rewards
                </h1>
                <div className="w-full h-[72vh] flex flex-col gap-3 overflow-y-auto">
                    {rewards.map((reward) => (
                        <div key={reward._id} className="w-full h-full">
                            <RewardCard
                                id={reward.id}
                                reward_name={reward.reward_name}
                                brand_name={reward.brand_name}
                                userId={user._id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
