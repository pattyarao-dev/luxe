"use client"

import React from 'react'
import { useState } from 'react'

interface CategoryType {
    name: string
    selected: boolean
}

export default function PreferencesComponent() {
    const [categories, setCategories] = useState<CategoryType[]>(
[
    {
        name: "Shopping",
        selected: false
    },

    {
        name: "This is a long text",
        selected: false
    },
    {
        name: "Leisure",
        selected: false
    },
    {
        name: "Test me",
        selected: false
    },
    {
        name: "MoreValue",
        selected: false
    },
    {
        name: "Cram",
        selected: false
    },
    {
        name: "Crazy",
        selected: false
    },
    {
        name: "Wild",
        selected: false
    },
    {
        name: "Laughter",
        selected: false
    },
    {
        name: "Suppers",
        selected: false
    },
    {
        name: "Eyoowaht",
        selected: false
    },
    {
        name: "L2P",
        selected: false
    },
    {
        name: "Testing",
        selected: false
    },
    {
        name: "Moretests",
        selected: false
    },
]
    )

    const toggleSelected = (index: number) => {
       setCategories( categories.map((c, i) => {
        if (index === i) {
            c.selected = !c.selected
        }
        return c
    }))
    }

  return (
    <div className="w-full min-h-screen p-8 flex items-start justify-center flex-col gap-10 gradient-background">
       <div>
            <h1 className="text-3xl font-bold text-midnight-blue">Welcome to Luxe!</h1>
            <p className="text-sm">Please set your preferences so we customize your feed to your liking.</p>
       </div>
        <div className="w-full flex flex-wrap justify-between gap-6">
            {categories.map((c, index) => (
                <button key={index} onClick={() => toggleSelected(index)} className={`w-fit flex-grow text-center py-2 px-6 rounded-3xl transition ease-in-out duration-200 ${!c.selected ? "bg-white" : "bg-purple text-white"}`}>{c.name}</button>
            ))}
        </div>
        <div className="w-full flex justify-end gap-6">
            <button className="uppercase text-gray-main text-xl font-bold">Skip</button>
            <button className="uppercase text-dark-purple text-xl font-bold">Proceed</button>
        </div>
    </div>
  )
}
