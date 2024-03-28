"use client"

import React from "react"
import { IoMdMenu } from "react-icons/io"
import { IoIosNotifications } from "react-icons/io"
import { MdClose } from "react-icons/md"
import { useState } from "react"
import Link from "next/link"
import { ObjectId } from "mongoose"
import User from "@/app/(models)/User"
import { getTokenContent } from "@/app/(services)/frontend/get_token"

interface MenuTypes {
    title: string
    url: string
}

export default function Header({ params }: { params: { slug: string } }) {
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false)
    const menuItems = [
        {
            title: "My Profile",
            url: "profile"
        },
        {
            title: "My Subscriptions",
            url: "subscriptions"
        },
        {
            title: "My Favorites",
            url: "favorites"
        },
        {
            title: "Reward History",
            url: "history"
        }
    ]

    return (
        <>
            <div className="top-0 sticky z-40 w-full bg-gradient-to-br from-purple to-midnight-blue">
                <div className="w-full flex justify-between items-center p-6 text-white">
                    <IoMdMenu
                        className="text-2xl"
                        onClick={() => setShowSideMenu(true)}
                    />
                    <Link href="/home">
                        <p className="text-4xl uppercase font-bold">Luxe.</p>
                    </Link>
                    <Link href={`/notifications/${params.slug}`}>
                        <IoIosNotifications className="text-2xl" />
                    </Link>
                </div>
            </div>

            {showSideMenu && (
                <>
                    <div className="fixed z-40 w-full min-h-screen bg-neutral-800/80 side-menu-overlay">
                        {" "}
                    </div>

                    <div className="fixed z-40 w-[90%] h-screen primary-background drop-shadow-lg side-menu">
                        <section className="w-full p-6 flex items-center justify-between bg-gradient-to-br from-dark-pink to-midnight-blue">
                            <p className="text-2xl text-white font-bold">
                                Menu
                            </p>
                            <MdClose
                                className="w-fit text-3xl text-white"
                                onClick={(e) => setShowSideMenu(false)}
                            />
                        </section>
                        <section className="w-full p-6 flex flex-col gap-10">
                            {menuItems.map((item, index) => (
                                <Link
                                    href={`/${item.url}/${params.slug}`}
                                    key={index}
                                >
                                    <p
                                        onClick={() => setShowSideMenu(false)}
                                        className="w-full p-2 uppercase font-bold border-b border-dark-purple"
                                    >
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </section>
                    </div>
                </>
            )}
        </>
    )
}
