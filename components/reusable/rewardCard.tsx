"use client"

import React, { useState } from 'react';
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import Image from 'next/image';

interface RewardCardProps {
  name: string;
  brand: string;
  start: Date;
  end: Date;
}

const RewardCard: React.FC<RewardCardProps> = ({ name, brand, start, end }) => {

  const [showFilledStar, setShowFIlled] = useState<boolean>(false);
  
  const handleShowFilledStar = () => {
    setShowFIlled(!showFilledStar)
  }

  return (
    <div className="reward-card">
      <div className="w-[25%] h-[90px] rounded-md flex justify-center bg-gray-main h-full">
        <Image src="/cuate.png" width={80} height={80} alt="reward image" className="p-2"></Image>
      </div>
      <div className="w-[60%] flex flex-col gap-4">
        <div>
          <h1 className="font-bold">{name}</h1>
          <p className="text-xs">{brand}</p>
        </div>
        <p className="text-xs">Available {start.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} to {end.toLocaleDateString(undefined, {  month: 'short', day: 'numeric', year: 'numeric' })} </p>

      </div>
      <div className="w-[10%] flex justify-center">
        <IoIosStarOutline className="text-2xl" />
        {/* <IoIosStar /> */}
      </div>
    </div>
  );
};

export default RewardCard;
