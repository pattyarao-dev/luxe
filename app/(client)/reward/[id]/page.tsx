import React from 'react'
import { RewardTypes } from '@/app/types/rewardTypes';
import Image from 'next/image';
import { ObjectId } from 'mongoose';
import Rewards from '@/app/(models)/Rewards';
import Link from 'next/link';

// async function getReward(id: number) {
//   const res = await fetch(`http://localhost:4000/rewards/${id}`);
//   return res.json();
// }

async function getReward(id: ObjectId) {
  try {
    const reward = await Rewards.findById(id).exec();
    return reward;
  } catch (error) {
    console.error('Error fetching rewards', error);
    return;
  }
}

export default async function Reward({params}:  {params: RewardTypes}) {
  const reward = await getReward(params.id)
  return (
    <main className="w-full h-full p-10 flex flex-col gap-10">
      <Link href="/home"><h1 className="w-fit font-semibold bg-dark-pink py-1 px-2 rounded-lg text-white">Go Back</h1></Link>
        <div className="flex flex-col gap-16">
      {reward && (
        <div className="w-full flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold">{reward.reward_name}</h1>
            <h3>{reward.brand_name}</h3>
          </div>
          <div>
            <Image src="/reward-stockimage.jpg" width={300} height={300} alt='stock image' className="w-full rounded-xl" />
          </div>
          <div>
            <p className="text-xs text-justify">{reward.reward_desc}</p>
          </div>
          <div>
            <h1 className="text-2xl uppercase font-semibold">Validity:</h1>
            {/* <p className="text-dark-pink font-bold">{reward.start} to {reward.end}</p> */}
            <p>{new Date(reward.expiry).toLocaleString().slice(0, 10)}</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2">
        <button className="gradient-button">Claim Now</button>
        <button className="outlined-button">Add to Favorites</button>
      </div>
    </div>
    </main>
  )
}
