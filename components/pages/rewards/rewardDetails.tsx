"use client"

import React from 'react'
import Image from 'next/image'
import { RewardTypes } from '@/app/types/rewardTypes'
import { useState } from 'react'

export const RewardDetails: React.FC<RewardTypes> = ({slug, name, brand, desc, start, end}) => {

  const [rewards, setRewards] = useState<RewardTypes[]>([
    {
      slug: "foo",
      name: "Exclusive early access to New Model bag",
      brand: "Louis Vuitton",
      desc: "🌟 Exciting News! 🌟 Claim exclusive early access to Louis Vuitton's Model Bag – the epitome of 2024 fashion. As a valued member, be a trendsetter with this iconic piece before its public release. Limited quantities available, so seize this opportunity now! Click the link to claim your early access. ",
      start: new Date("January 10, 2024"),
      end: new Date("February 10, 2024")
    }
  ])

  return (
    <div>
      <div className="w-full flex flex-col gap-8">
        <div>
            <h1 className="text-4xl font-bold">{name}</h1>
            <h3>{brand}</h3>
        </div>
        <div>
          <Image src="/reward-stockimage.jpg" width={300} height={300} alt='stock image' className="w-full rounded-xl"/>
        </div>
        <div>
          <p className="text-xs text-justify">{desc}</p>
        </div>
        <div>
            <h1 className="text-2xl uppercase font-semibold">Validity:</h1>
            <p className="text-dark-pink font-bold">{start.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} to {end.toLocaleDateString(undefined, {  month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <button className="gradient-button">Claim Now</button>
        <button className="outlined-button">Add to Favorites</button>
      </div>
    </div>
  )
}
