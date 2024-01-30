import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

export default function Header() {
  return (
    <div className="w-full gradient-background-dark">

      <div className="w-full flex justify-between items-center p-6 text-white">
        <IoMdMenu className="text-2xl"/>
        <p className="text-4xl uppercase font-bold">Luxe.</p>
        <IoIosNotifications className="text-2xl" />
      </div>

    </div>
  )
}
