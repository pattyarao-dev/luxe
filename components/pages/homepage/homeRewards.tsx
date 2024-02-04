"use client"

import RewardCard  from '@/components/reusable/rewardCard';
import React, { useState } from 'react'

interface rewardType {
  name: string;
  brand: string;
  start: Date;
  end: Date;
}

export const HomeRewards = () => {

  const [homeRewards, setHomeRewards] = useState<rewardType[]>([
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
    {
      name: "Exclusive early access to Model bag",
      brand: "Louis Vuitton",
      start: new Date("January 10 2024"),
      end: new Date("July 10 2024")
    },
  ])

  return (
    <div className="w-full p-4 flex flex-col gap-6">

{homeRewards.map((reward, index) => (
        <RewardCard
          key={index}
          name={reward.name}
          brand={reward.brand}
          start={reward.start}
          end={reward.end}
        />
      ))}

    </div>
  )
}

