"use client"

import { NotificationTypes } from "@/app/types/notificationTypes"
import { LoadingComponent } from "@/components/reusable/LoadingComponent"
import { ObjectId } from "mongoose"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"

interface notificationTypes {
    heading: string
    description: string
}

export const NotificationsList = ({ userId }: { userId: ObjectId }) => {
    const [notifications, setNotifications] = useState<NotificationTypes[]>([])

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/notifications?id=${userId}`
                )
                const data = await response.json()
                setNotifications(data.notifications)
            } catch (error) {
                console.error("Error fetching subscriptions:", error)
            }
        }

        fetchNotifications()
    }, [])

    const handleReadNotification = async (notifId: ObjectId) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/notifications/read?client=${userId}&notif=${notifId}`,
                {
                    method: "PATCH", // Use PATCH method
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (!response.ok) {
                throw new Error("Failed to mark notification as read")
            }

            // Update notifications state to reflect the change
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) =>
                    notif._id === notifId ? { ...notif, read: true } : notif
                )
            )
        } catch (error) {
            console.error("Error encountered", error)
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="w-full p-4 text-3xl font-bold">Notifications</h1>
            {notifications ? (
                <div className="w-full p-4 flex flex-col gap-6">
                    {notifications.map((notif: NotificationTypes, index) => (
                        <Link href={`/reward/${notif.reward}`}>
                            <div
                                className="w-full p-4 flex items-center justify-between bg-white border-2 drop-shadow-gray rounded-lg"
                                onClick={() =>
                                    handleReadNotification(notif._id)
                                }
                                key={index}
                            >
                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {notif.sender_name}
                                    </h2>
                                    <p className="text-dark-purple">
                                        {notif.message}
                                    </p>
                                </div>
                                <MdKeyboardArrowRight />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>
                    <LoadingComponent />
                    <p>Loading</p>
                </div>
            )}
        </div>
    )
}
