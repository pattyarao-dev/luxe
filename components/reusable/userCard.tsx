"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface UserCardProps {
  branch_name: string;
}

const UserCard: React.FC<UserCardProps> = ({ branch_name }) => {

  return (
    <div className="branch-card w-full">
        <div className="w-[10%] h-[60px] rounded-md flex justify-center bg-gray-main h-full">
            <Image src="/cuate.png" width={80} height={80} alt="reward image" className="p-2"></Image>
        </div>
        <div className="w-[60%] flex flex-col gap-4">
            <div>
                <h1 className="font-bold">{branch_name}</h1>
                <p className="text-xs">Brand Location</p>
            </div>
        </div>
    </div>
  );
};

export default UserCard;