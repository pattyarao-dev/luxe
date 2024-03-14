"use client"

import React, { useState } from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface StarIconProps {
  onSaveReward: () => Promise<void>; // Function that returns a promise
}

export const StarIcon: React.FC<StarIconProps> = ({onSaveReward}) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

   const handleSaveReward = async () => {
    try {
      await onSaveReward(); // Trigger the action that returns a promise
    } catch (error) {
      console.error('Error saving reward:', error);
    }
  };
    
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleSaveReward}>
        {isHovered ? <FaStar/> : <FaRegStar/>}
    </div>
  )
}
