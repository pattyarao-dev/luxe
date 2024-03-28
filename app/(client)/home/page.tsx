import Image from "next/image"
import { IoIosStarOutline } from "react-icons/io"
import SearchBar from "@/components/reusable/searchbar"
import Link from "next/link"
import Rewards from "@/app/(models)/Rewards"
import { getTokenContent } from "../../(services)/frontend/get_token"
import { StarIcon } from "@/components/reusable/staricon"
import { ObjectId } from "mongoose"
import { RewardCard } from "@/components/pages/clienthome/RewardCard"
import { ClientHomepage } from "@/components/pages/clienthome/ClientHomepage"

// async function getRewards() {
//   const res = await fetch(`http://localhost:4000/rewards`);
//   return res.json();
// }
// async function getRewards() {
//     try {
//         const rewards = await Rewards.find().exec()
//         return rewards
//     } catch (error) {
//         console.error("Error fetching rewards", error)
//         return []
//     }
// }

export default function Home() {
    const user = getTokenContent()
    const { _id, user_type } = user

    // const saveReward = async (rewardId: ObjectId) => {
    //     try {
    //         const res = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/reward/save?client=${user._id}&reward=${rewardId}`,
    //             {
    //                 method: "PATCH"
    //             }
    //         )
    //         const data = await res.json()
    //         console.log(data.message)
    //     } catch (error) {
    //         console.error("Error saving reward:", error)
    //     }
    // }

    return (
        <main className="w-full min-h-screen primary-background">
             <ClientHomepage user={user._id} />
        </main>
    )
}
