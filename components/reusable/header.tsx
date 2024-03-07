'use client'

import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import Link from 'next/link';
import { ObjectId } from 'mongoose';
import User from '@/app/(models)/User';
import { getTokenContent } from '@/app/(services)/frontend/get_token';

export default function Header({params}:  {params: {slug: string}}) {

  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);


  return (
    <>
      <div className="top-0 sticky z-40 w-full gradient-background-dark">
        <div className="w-full flex justify-between items-center p-6 text-white">
          <IoMdMenu className="text-2xl" onClick={() => setShowSideMenu(true)}/>
          <Link href="/home"><p className="text-4xl uppercase font-bold">Luxe.</p></Link>
          <Link href="/notifications"><IoIosNotifications className="text-2xl" /></Link>
        </div>
      </div>

      {showSideMenu && (
        <>
        <div className="fixed z-40 w-full min-h-screen bg-midnight-blue/70 side-menu-overlay"> </div>

        <div className="fixed z-40 w-[90%] h-screen bg-white/80 drop-shadow-lg side-menu">
          <section className="w-full p-6 flex items-center justify-between bg-dark-pink">
            <h1 className="w-[40%] text-2xl text-white">Hey there, <span className="text-yellow-500 font-bold">Patty</span></h1>
            <MdClose className="w-fit text-3xl text-white" onClick={(e) => setShowSideMenu(false)}/>
          </section>
          <section className="w-full p-6 flex flex-col gap-8">
            <Link href={`/profile/${params.slug}`} onClick={(e) => setShowSideMenu(false)}><button className="bg-midnight-blue/30 p-4 w-full text-left font-semibold uppercase rounded-xl text-white drop-shadow-sm">My Profile</button></Link>
            <Link href={`/subscriptions/${params.slug}`} onClick={(e) => setShowSideMenu(false)}><button className="bg-midnight-blue/30 p-4 w-full text-left font-semibold uppercase rounded-xl text-white drop-shadow-sm">My Subscriptions</button></Link>
            <Link href={`/favorites/${params.slug}`} onClick={(e) => setShowSideMenu(false)}><button className="bg-midnight-blue/30 p-4 w-full text-left font-semibold uppercase rounded-xl text-white drop-shadow-sm">My Favorites</button></Link>
            <Link href={`/history/${params.slug}`} onClick={(e) => setShowSideMenu(false)}><button className="bg-midnight-blue/30 p-4 w-full text-left font-semibold uppercase rounded-xl text-white drop-shadow-sm">Reward History</button></Link>
          </section>
        </div>
        </>
      )}
    </>
  )
}
