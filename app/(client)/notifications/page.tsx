import { NotificationsList } from "@/components/pages/notifications/notificationsList"
import Header from "@/components/reusable/header"
import React from "react"

export default function Notifications() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <NotificationsList />
        </main>
    )
}
