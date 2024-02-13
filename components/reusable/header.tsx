'use client'

import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useState } from 'react';

export default function Header() {

  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

  return (
    <>
      <div className="top-0 sticky z-40 w-full gradient-background-dark">
        <div className="w-full flex justify-between items-center p-6 text-white">
          <IoMdMenu className="text-2xl" onClick={() => setShowSideMenu(true)}/>
          <p className="text-4xl uppercase font-bold">Luxe.</p>
          <IoIosNotifications className="text-2xl" />
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
            <button className="outlined-button">My Profile</button>
            <button className="outlined-button">My Subscriptions</button>
            <button className="outlined-button">My Favorites</button>
            <button className="outlined-button">Reward History</button>
          </section>
        </div>
        </>
      )}
    </>
  )
}
