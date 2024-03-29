import React from "react"
import Image from "next/image"
import { getTokenContent } from "@/app/(services)/frontend/get_token"
import { UserHistory } from "@/components/pages/history/UserHistory"

export default function History({ params }: { params: { slug: string } }) {
    const user = getTokenContent()
    const { _id, user_type } = user
    return (
        <main className="w-full min-h-screen flex flex-col primary-background">
            <div className="w-full h-fit pt-8 pb-4 px-4 flex flex-col justify-center gap-4">
                <h1 className="text-dark-purple text-2xl font-bold">
                   History
                </h1>
                <hr className="w-full border border-dark-pink" />
            </div>
          
           <div className="w-full p-4 flex flex-col gap-6 overflow-y-auto">
                <UserHistory user={user._id}/>
            </div>
        </main>
    )
}
