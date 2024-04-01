"use client"

import React, { useEffect, useState } from "react"
import PreferencesComponent from "../preferences/preferencesComponent"
import { UserTypes } from "@/app/types/userTypes"
import { useRouter } from "next/navigation"

interface ClientUserTypes {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    user_type: string
    preference_tags: string[]
}

interface MerchantUserTypes {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    user_type: string
    company_name: string
    company_desc: string
}

export default function SignupComp() {
    const [users, setUsers] = useState<string[]>(["CLIENT", "ADMIN_ALL"])
    const [selectedUser, setSelectedUser] = useState<string>("")
    const { push } = useRouter()

    // const [firstname, setFirstName] = useState<string>("")
    // const [lastName, setLastName] = useState<string>("")
    // const [username, setUsername] = useState<string>("")
    // const [email, setEmail] = useState<string>("")
    // const [password, setPassword] = useState<string>("")
    // const [preferences, setPreferences] = useState<string[]>([])

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [passwordMatch, setPaswordMatch] = useState<boolean>()

    const [addUserData, setAddUserData] = useState<ClientUserTypes>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        user_type: "",
        preference_tags: []
    })

    const [addMerchantData, setAddMerchantData] = useState<MerchantUserTypes>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        user_type: "",
        company_name: "",
        company_desc: ""
    })

    const [signupMessage, setSignupMessage] = useState<string>("")

    useEffect(() => {
        async function fetchPreferenceTags() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/tags`
                )
                if (response.ok) {
                    const data = await response.json()
                    setPreferences(data.tags)
                } else {
                    console.error("Failed to fetch tags")
                }
            } catch (error) {
                console.error("Failed to fetch tags", error)
            }
        }

        fetchPreferenceTags()
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setAddUserData((prev) => ({ ...prev, [name]: value }))
        console.log({ ...addUserData, [name]: value }) // Log the updated state directly
    }

    const handleMerchantChange = (e: any) => {
        const { name, value } = e.target
        setAddMerchantData((prev) => ({ ...prev, [name]: value }))
        console.log({ ...addMerchantData, [name]: value }) // Log the updated state directly
    }

    function checkPassword() {
        if (addUserData.password !== confirmPassword) {
            setPasswordError("Passwords do not match. Try again.")
            setPaswordMatch(false)
        } else if (addUserData.password === confirmPassword) {
            setPaswordMatch(true)
        }
    }

    function checkMerchantPassword() {
        if (addMerchantData.password !== confirmPassword) {
            setPasswordError("Passwords do not match. Try again.")
            setPaswordMatch(false)
        } else if (addMerchantData.password === confirmPassword) {
            setPaswordMatch(true)
        }
    }

    const handlePreferenceClick = (preference: string) => {
        setAddUserData((prevUserData) => {
            const isSelected = prevUserData.preference_tags.includes(preference)
            const updatedTags = isSelected
                ? prevUserData.preference_tags.filter(
                      (tag) => tag !== preference
                  )
                : [...prevUserData.preference_tags, preference]
            console.log("Updated preference_tags:", updatedTags)
            return {
                ...prevUserData,
                preference_tags: updatedTags
            }
        })
    }

    function handleAddUser() {
        if (passwordMatch === false) {
            setPasswordError("Please make sure your passwords match")
        }

        const postData = {
            first_name: addUserData.first_name,
            last_name: addUserData.last_name,
            username: addUserData.username,
            email: addUserData.email,
            password: addUserData.password,
            user_type: addUserData.user_type,
            preference_tags: addUserData.preference_tags
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }).then((response) => {
            if (response.ok) {
                // Brand added successfully, close the modal or perform any other actions
                setSignupMessage("Account created!")
                push("/login")
            } else {
                // Handle errors if any
                console.error("Failed to add user:", response.statusText)
            }
        })
    }

    function handleAddMerchant() {
        if (passwordMatch === false) {
            setPasswordError("Please make sure your passwords match")
        }

        const postData = {
            first_name: addMerchantData.first_name,
            last_name: addMerchantData.last_name,
            username: addMerchantData.username,
            email: addMerchantData.email,
            password: addMerchantData.password,
            user_type: addMerchantData.user_type,
            company_name: addMerchantData.company_name,
            company_desc: addMerchantData.company_desc
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }).then((response) => {
            if (response.ok) {
                // Brand added successfully, close the modal or perform any other actions
                setSignupMessage("Account created!")
                push("/login")
            } else {
                // Handle errors if any
                console.error("Failed to add user:", response.statusText)
            }
        })
    }

    const [preferences, setPreferences] = useState<string[]>([])

    function scrollToSection(id: string) {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <section className="w-full h-screen p-4 flex flex-col justify-center items-center gap-16 lg:gap-8">
                <h1 className="w-2/3 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-neutral-200 to-neutral-400">
                    Hello, welcome to{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-dark-pink to-dark-purple">
                        Luxe!
                    </span>
                </h1>
                <button
                    onClick={() => scrollToSection("choose__user")}
                    className="w-2/3 text-left text-neutral-500 uppercase"
                >
                    Start
                </button>
                <p>
                    Already have an account?{" "}
                    <span className="text-dark-pink font-semibold">
                        Sign in!
                    </span>
                </p>
            </section>
            <section
                id="choose__user"
                className="w-full h-screen p-4 flex flex-col justify-center items-center gap-16 lg:gap-8"
            >
                <div className="w-2/3 flex flex-col justify-center gap-3">
                    <p>I am using Luxe as a ...</p>
                    <div className="flex gap-10">
                        {/* {users.map((user) => (
                            <p
                                className={`uppercase font-bold text-2xl cursor-pointer transition ease-in-out duration-100 ${
                                    user === selectedUser
                                        ? "text-dark-pink scale-125"
                                        : "text-gray-main"
                                }`}
                                onClick={() => {
                                    setSelectedUser(user)
                                    setAddUserData((prev) => ({
                                        ...prev,
                                        user_type: user
                                    }))
                                }}
                            >
                                {user}
                            </p>
                        ))} */}
                        <button
                            onClick={() => {
                                setSelectedUser("CLIENT")
                                setAddUserData((prev) => ({
                                    ...prev,
                                    user_type: "CLIENT"
                                }))
                            }}
                            className={`font-bold uppercase text-2xl ${
                                selectedUser === "CLIENT"
                                    ? "text-dark-pink"
                                    : "text-neutral-400"
                            }`}
                        >
                            Buyer
                        </button>
                        <button
                            onClick={() => {
                                setSelectedUser("ADMIN_ALL")
                                setAddMerchantData((prev) => ({
                                    ...prev,
                                    user_type: "ADMIN_ALL"
                                }))
                            }}
                            className={`font-bold uppercase text-2xl ${
                                selectedUser === "ADMIN_ALL"
                                    ? "text-dark-pink"
                                    : "text-neutral-400"
                            }`}
                        >
                            Merchant
                        </button>
                    </div>
                    <button
                        onClick={() => scrollToSection(selectedUser)}
                        className="w-fit text-left text-neutral-500 uppercase cursor-pointer transition-all ease-in-out duration-100 hover:text-dark-pink active:text-dark-pink hover:scale-105"
                    >
                        next
                    </button>
                </div>
            </section>

            {selectedUser === "CLIENT" ? (
                <>
                    <section
                        id="CLIENT"
                        className="w-full h-screen p-4 flex flex-col justify-center items-center gap-16 lg:gap-8"
                    >
                        <div className="w-2/3 flex flex-col justify-center items-center gap-6">
                            <h1 className="w-full text-2xl font-bold text-left text-dark-purple">
                                Get exclusive rewards with Luxe
                            </h1>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    First Name
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addUserData.first_name}
                                    onChange={handleChange}
                                    name="first_name"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Last Name
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addUserData.last_name}
                                    onChange={handleChange}
                                    name="last_name"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Username
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addUserData.username}
                                    onChange={handleChange}
                                    name="username"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Email
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addUserData.email}
                                    onChange={handleChange}
                                    name="email"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Password
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="password"
                                    value={addUserData.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Confirm Password
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-xs mt-3">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-2/3 ">
                            <p
                                className="w-fit text-left text-neutral-500 uppercase cursor-pointer transition-all ease-in-out duration-100 hover:text-dark-pink active:text-dark-pink hover:scale-105"
                                onClick={() =>
                                    scrollToSection(
                                        "client__preferences__section"
                                    )
                                }
                            >
                                next
                            </p>
                        </div>
                    </section>
                    <section
                        id="client__preferences__section"
                        className="w-full h-screen p-4 flex flex-col justify-center items-center gap-8 lg:gap-16"
                    >
                        <div className="w-full px-4 flex flex-col justify-center items-center gap-6">
                            <p className="text-sm">
                                Please set your preferences so we customize your
                                feed to your liking.
                            </p>
                        </div>
                        <div className="w-full lg:w-2/3 py-2 flex flex-wrap justify-between items-center gap-6">
                            {preferences.map((preference, index) => (
                                <button
                                    key={index}
                                    className={`w-fit flex-grow text-center py-2 px-4 rounded-3xl transition ease-in-out duration-200 ${
                                        addUserData.preference_tags.includes(
                                            preference
                                        )
                                            ? "bg-dark-pink text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() =>
                                        handlePreferenceClick(preference)
                                    }
                                >
                                    {preference}
                                </button>
                            ))}
                        </div>

                        <button
                            className="w-fit px-6 py-2 bg-dark-pink text-white rounded-md"
                            onClick={handleAddUser}
                        >
                            Create Account
                        </button>
                    </section>
                </>
            ) : (
                <>
                    <section
                        id="ADMIN_ALL"
                        className="w-full h-screen p-4 flex flex-col justify-center items-center gap-8 lg:gap-8"
                    >
                        <div className="w-2/3 flex flex-col justify-center items-center gap-6">
                            <h1 className="w-full text-2xl font-bold text-left text-dark-purple uppercase">
                                Merchant Sign-in
                            </h1>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    First Name
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addMerchantData.first_name}
                                    onChange={handleMerchantChange}
                                    name="first_name"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Last Name
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addMerchantData.last_name}
                                    onChange={handleMerchantChange}
                                    name="last_name"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Username
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addMerchantData.username}
                                    onChange={handleMerchantChange}
                                    name="username"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Email
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="text"
                                    value={addMerchantData.email}
                                    onChange={handleMerchantChange}
                                    name="email"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Password
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="password"
                                    value={addMerchantData.password}
                                    onChange={handleMerchantChange}
                                    name="password"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p className="text-dark-pink text-sm uppercase">
                                    Confirm Password
                                </p>
                                <input
                                    className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 focus:outline-none"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-xs mt-3">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-6 bg-white/50 p-4 rounded-md drop-shadow-md">
                                <div className="w-full flex flex-col gap-1">
                                    <p className="text-dark-pink text-sm uppercase">
                                        Company Name
                                    </p>
                                    <input
                                        className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400 bg-neutral-100"
                                        type="text"
                                        value={addMerchantData.company_name}
                                        onChange={handleMerchantChange}
                                        name="company_name"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <p className="text-dark-pink text-sm uppercase">
                                        Company Description
                                    </p>
                                    <input
                                        className="p-2 rounded-md drop-shadow-md text-sm text-neutral-400"
                                        type="textarea"
                                        value={addMerchantData.company_desc}
                                        onChange={handleMerchantChange}
                                        name="company_desc"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-fit px-6 py-2 bg-dark-pink text-white rounded-md"
                            onClick={handleAddMerchant}
                        >
                            Create Account
                        </button>
                    </section>
                </>
            )}
        </div>
    )
}
