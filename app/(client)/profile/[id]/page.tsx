import React from "react"
import Image from "next/image"
import { useState } from "react"
import ProfileDetails from "@/components/pages/profile/profileDetailsComponent"
import IconComp from "@/components/pages/profile/iconComponent"
import User from "@/app/(models)/User"
import { ObjectId } from "mongoose"

async function getUserProfile(id: ObjectId) {
    try {
        const user = await User.findById(id).exec()
        console.log(user)
        return user
    } catch (error) {
        console.error("error fetching profile", error)
    }
}

export default async function Profile({
    params
}: {
    params: { id: ObjectId }
}) {
    const user = await getUserProfile(params.id)
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center gap-16 primary-background">
            {user && <ProfileDetails user={user} />}
        </main>
    )
}
