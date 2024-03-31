"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginComp() {
    // State for email and password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { push } = useRouter()
    const [error, setError] = useState("")

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL! + "/auth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            // Handle response as needed
            const data = await response.json()
            console.log(data) // Log response data

            if (!response.ok) {
                throw new Error(data.message)
            }

            if (
                !data.user_type ||
                (data.user_type !== "CLIENT" &&
                    data.user_type !== "ADMIN" &&
                    data.user_type !== "ADMIN_ALL" &&
                    data.user_type !== "CASHIER")
            ) {
                push("/login")
                setError(data.message)
                return
            }

            if (data.user_type === "CLIENT") {
                push("/home")
            } else if (
                data.user_type === "ADMIN" ||
                data.user_type === "ADMIN_ALL"
            ) {
                push("/analytics")
            } else if (data.user_type === "CASHIER") {
                push("/cashier/verify")
            } else {
                push("/login")
            }
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    return (
        <div className="w-2/3 lg:w-[30%] flex justify-center flex-col gap-20">
            <h1 className="text-4xl uppercase font-bold bg-clip-text text-transparent bg-gradient-to-br from-dark-pink to-dark-purple">
                Luxe
            </h1>
            <div className="w-full flex flex-col items-center gap-6">
                {/* Input fields with state */}
                <input
                    type="text"
                    placeholder="email"
                    className="w-full p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="w-full p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* Submit button */}
            <div className="w-full flex flex-col gap-4">
                <button
                    className="w-full gradient-button"
                    onClick={handleSubmit}
                >
                    Login
                </button>
                {error ? <p className="text-red-500">{error}</p> : null}
            </div>
            <div>
                <p>
                    New to Luxe?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-dark-pink"
                    >
                        Sign up today!
                    </Link>
                </p>
            </div>
        </div>
    )
}
