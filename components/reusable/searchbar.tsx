"use client"

import React, { useState } from "react"
import { IoSearch } from "react-icons/io5"

interface SearchBarProps {
    onSearch: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value
        setSearchTerm(term)
        onSearch(term) // Call the callback function with the search term
    }

    return (
        <div className="w-full">
            <div className="w-full flex items-center gap-2 border-2 p-3 rounded-lg border-dark-pink bg-white drop-shadow-lg">
                <IoSearch className="text-dark-pink" />
                <input
                    type="text"
                    className="appearance-none focus:outline-none grow text-sm"
                    placeholder="Search a reward..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}

export default SearchBar
