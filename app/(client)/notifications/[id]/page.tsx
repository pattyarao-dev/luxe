import { getTokenContent } from "@/app/(services)/frontend/get_token"
import { NotificationsList } from "@/components/pages/notifications/notificationsList"
import Header from "@/components/reusable/header"
import { ObjectId } from "mongoose"
import React from "react"

export default function Notifications({
    params
}: {
    params: { id: ObjectId }
}) {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <NotificationsList userId={params.id} />
        </main>
    )
}
