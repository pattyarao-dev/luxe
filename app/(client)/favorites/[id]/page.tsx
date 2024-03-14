import React from 'react'
import Image from 'next/image';
import { IoIosStarOutline } from "react-icons/io";
import SearchBar from '@/components/reusable/searchbar';
import Link from 'next/link';
import Rewards from '@/app/(models)/Rewards';
import { UserSavedRewards } from '@/components/pages/savedrewards/viewSavedRewardsComponent';
import { ObjectId } from 'mongoose';


export default async function Favorites({params}:  {params: {id: ObjectId}}) {

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
          <UserSavedRewards userId={params.id}/>
        </div>
    </main>
  )
}
