import { RewardDetails } from '@/components/pages/rewards/rewardDetails'
import React from 'react'
import { RewardTypes } from '@/app/types/rewardTypes';

export default function Reward({params}:  {params: RewardTypes}) {
  const { id, name, brand, desc, start, end } = params;
  return (
    <main className="w-full h-full p-10 flex flex-col gap-16">
        <RewardDetails id={id} name={name} brand={brand} desc={desc} start={start} end={end} />
    </main>
  )
}
