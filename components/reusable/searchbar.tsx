import React from 'react'
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="w-full p-4">
        <div className="w-full flex items-center gap-2 border-2 p-3 rounded-lg border-dark-pink bg-white drop-shadow-dark-pink">
        <IoSearch className="text-dark-pink"/>
        <input type="text" className="appearance-none focus:outline-none grow text-sm" placeholder="Search a reward..."/>
        </div>
    </div>
  )
}
