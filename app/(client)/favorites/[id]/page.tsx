import React from 'react'
import Image from 'next/image';
import { IoIosStarOutline } from "react-icons/io";
import SearchBar from '@/components/reusable/searchbar';
import Link from 'next/link';
import Rewards from '@/app/(models)/Rewards';


async function getRewards() {
  try {
    const rewards = await Rewards.find().exec();
    return rewards;
  } catch (error) {
    console.error('Error fetching rewards', error);
    return [];
  }
}


export default async function Favorites({params}:  {params: {slug: string}}) {

   const rewards = await getRewards()

  return (
    <main className="w-full min-h-screen flex flex-col">
         <div className="w-full h-fit pt-8 pb-4 px-4 flex flex-col justify-center gap-4">
          <h1 className="text-dark-purple text-2xl font-bold">My Favorites</h1>
          <hr className="w-full border border-dark-pink"/>
        </div>
        <div className="">
          <SearchBar/>
        </div>
        <div className="w-full p-4 flex flex-col gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="w-full">
              <Link href={`/reward/${reward.id}`}>
                <div className="reward-card">
                <div className="w-[25%] h-[90px] rounded-md flex justify-center bg-gray-main h-full">
                <Image src="/cuate.png" width={80} height={80} alt="reward image" className="p-2"></Image>
              </div>
              <div className="w-[60%] flex flex-col gap-4">
                <div>
                  <h1 className="font-bold">{reward.reward_name}</h1>
                  <p className="text-xs">{reward.brand_name}</p>
                </div>
              </div>
              <div className="w-[10%] flex justify-center">
              <IoIosStarOutline className="text-2xl" />
                {/* <IoIosStar /> */}
              </div>
                </div>
              </Link>
            </div>
        ))}
        </div>
    </main>
  )
}
