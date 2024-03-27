import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ObjectId } from "mongoose"
import Link from "next/link"
import Brand from "@/app/(models)/Brand"
import { UserSubscriptions } from "@/components/pages/usersubscriptions/userSubscriptions"
import { getTokenContent } from "../../../(services)/frontend/get_token"

export default function Subscriptions({ params }: { params: { id: string } }) {
    const user = getTokenContent()
    const { _id, user_type } = user

    console.log(params.id)
    console.log(user._id)
    return (
        <main className="w-full min-h-screen primary-background">
            <div className="w-full h-fit px-4 py-8 flex flex-col justify-center gap-4">
                <h1 className="text-dark-purple text-2xl font-bold">
                    My Subscriptions
                </h1>
                <hr className="w-full border border-dark-pink" />
            </div>
            <div className="w-full p-4">
                <UserSubscriptions userId={params.id} />
            </div>
        </main>
    )
}
