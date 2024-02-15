"use client"

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { RewardTypes } from '@/app/types/rewardTypes'

async function getReward(id: number) {
  const res = await fetch(`http://localhost:4000/rewards/${id}`);
  return res.json();
}

export const RewardDetails: React.FC<RewardTypes> = ({ id, name, brand, desc, start, end }) => {
  const [reward, setReward] = useState<RewardTypes | null>(null);

  useEffect(() => {
    async function fetchReward() {
      try {
        const fetchedReward = await getReward(id);
        setReward(fetchedReward);
      } catch (error) {
        console.error('Error fetching reward:', error);
      }
    }
    fetchReward();
  }, [id]);

  return (
    <div className="flex flex-col gap-16">
      {reward && (
        <div className="w-full flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold">{reward.name}</h1>
            <h3>{reward.brand}</h3>
          </div>
          <div>
            <Image src="/reward-stockimage.jpg" width={300} height={300} alt='stock image' className="w-full rounded-xl" />
          </div>
          <div>
            <p className="text-xs text-justify">{reward.desc}</p>
          </div>
          <div>
            <h1 className="text-2xl uppercase font-semibold">Validity:</h1>
            <p className="text-dark-pink font-bold">{reward.start} to {reward.end}</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2">
        <button className="gradient-button">Claim Now</button>
        <button className="outlined-button">Add to Favorites</button>
      </div>
    </div>
  );
};
