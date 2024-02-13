import { HomeRewards } from '@/components/pages/homepage/homeRewards'
import Header from '@/components/reusable/header'
import SearchBar from '@/components/reusable/searchbar'
import React from 'react'
export default function Home() {

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start gap-10">
        <div className="top-20 sticky z-20 w-full flex flex-col gap-3 bg-white">
          <SearchBar/>
        </div>
        <div className="">
          <h1 className="px-4 text-3xl font-bold">Browse Rewards</h1>
          <HomeRewards/>
        </div>
    </main>
        

  )
}