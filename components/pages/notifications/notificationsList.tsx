"use client"

import React, { useState } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"

interface notificationTypes {
    heading: string
    description: string
}

export const NotificationsList = () => {
    const [notifications, setNotifications] = useState<notificationTypes[]>([
        {
            heading: "Balenciaga",
            description: "New Reward Available!"
        },
        {
            heading: "Yves Saint Laurent",
            description: "Last 2 days to claim reward!"
        },
        {
            heading: "Balenciaga",
            description: "New Reward Available!"
        },
        {
            heading: "Yves Saint Laurent",
            description: "Last 2 days to claim reward!"
        },
        {
            heading: "Balenciaga",
            description: "New Reward Available!"
        },
        {
            heading: "Yves Saint Laurent",
            description: "Last 2 days to claim reward!"
        },
        {
            heading: "Balenciaga",
            description: "New Reward Available!"
        },
        {
            heading: "Yves Saint Laurent",
            description: "Last 2 days to claim reward!"
        }
    ])

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="w-full p-4 text-3xl font-bold">Notifications</h1>
            <div className="w-full p-4 flex flex-col gap-6">
                {notifications.map((notif) => (
                    <div className="w-full p-4 flex items-center justify-between bg-white border-2 drop-shadow-gray rounded-lg">
                        <div>
                            <h2 className="font-semibold text-lg">
                                {notif.heading}
                            </h2>
                            <p className="text-dark-purple">
                                {notif.description}
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                ))}
            </div>
        </div>
    )
}
