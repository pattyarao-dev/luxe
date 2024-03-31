"use client"

import { UserTypes } from "@/app/types/userTypes"
import { useRouter } from "next/navigation"
import React from "react"
import { useState } from "react"
import { FaUser } from "react-icons/fa"

export default function ProfileDetails({ user }: { user: UserTypes }) {
    const { push } = useRouter()
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                credentials: "same-origin"
            })
            if (response.ok) {
                // Logout successful, you might want to redirect or update UI accordingly
                console.log("Logged out successfully")
                push("/login")
            } else {
                console.error("Failed to logout:", response.statusText)
            }
        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    return (
        <>
            <main className="w-2/3 h-72 flex flex-col items-center justify-center gap-6 bg-white rounded-md drop-shadow-md">
                <div className="rounded-md">
                    <FaUser className="text-5xl text-neutral-300" />
                </div>
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-2xl font-semibold text-dark-pink">{`${user.first_name} ${user.last_name}`}</h1>
                    <h3 className="text-xs text-gray-main">{user.email}</h3>
                </div>
            </main>
            <button
                className="text-dark-purple font-semibold uppercase"
                onClick={handleLogout}
            >
                Logout
            </button>
        </>
    )
}
