import { HomeRewards } from '@/components/pages/homepage/homeRewards'
import Header from '@/components/reusable/header'
import SearchBar from '@/components/reusable/searchbar'
import React from 'react'

export default function Home() {

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start gap-10">
        <div className="z-40 top-0 sticky w-full flex flex-col gap-3 bg-white pb-8">
          <Header/>
          <SearchBar/>
        </div>
        <HomeRewards/>
    </main>
        

  )
}
