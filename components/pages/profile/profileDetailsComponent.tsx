"use client"

import { UserTypes } from "@/app/types/userTypes"
import React from "react"
import { useState } from "react"
import { FaUser } from "react-icons/fa"

interface userDetailsType {
    name: string
    email: string
    address: string
    phone: number
    birthdate: Date
}

export default function ProfileDetails({ user }: { user: UserTypes }) {
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false)

    return (
        <main className="w-full min-h-screen">
            <div className="w-full p-10 flex flex-col gap-4">
                <div className="w-full flex items-center gap-6">
                    <div className="bg-gray-main p-3 rounded-md">
                        <FaUser className="text-5xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-dark-pink">{`${user.first_name} ${user.last_name}`}</h1>
                        <h3 className="text-xs text-gray-main">{user.email}</h3>
                    </div>
                </div>
                <hr className="w-full border border-dark-pink" />
            </div>
        </main>
        // <>
        //     {!isEditClicked ? (
        //         <section className="mt-24 w-full flex flex-col justify-center items-center gap-10">
        //             <div className="w-[80%] border border-dark-pink px-6 py-8 flex flex-col gap-2 rounded-xl drop-shadow-dark-pink bg-white">
        //                 <div className="information">
        //                     <h1 className="profile-title">Name</h1>
        //                     <p className="profile-data">{`${user.first_name} ${user.last_name}`}</p>
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Email</h1>
        //                     <p className="profile-data">{user.email}</p>
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Address</h1>
        //                     <p className="profile-data">
        //                         Metro Manila, Philippines
        //                     </p>
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Phone</h1>
        //                     <p className="profile-data">123456</p>
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Birthdate</h1>
        //                     <p className="profile-data">01 / 01 / 91</p>
        //                 </div>
        //             </div>
        //             <button
        //                 className="gradient-button w-[80%] py-3"
        //                 onClick={() => setIsEditClicked(!isEditClicked)}
        //             >
        //                 Edit Profile
        //             </button>
        //         </section>
        //     ) : (
        //         <section className="mt-24 w-full flex flex-col justify-center items-center gap-10">
        //             <div className="w-[80%] border border-dark-pink px-6 py-8 flex flex-col gap-2 rounded-xl drop-shadow-dark-pink bg-white">
        //                 <div className="information">
        //                     <h1 className="profile-title">Name</h1>
        //                     {/* <p className="profile-data">Juan Dela Cruz</p> */}
        //                     <input
        //                         type="text"
        //                         className="profile-data focus:outline-none"
        //                         placeholder="Edit your name"
        //                     />
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Email</h1>
        //                     <p className="profile-data">jdelacruz@gmail.com</p>
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Address</h1>
        //                     <input
        //                         type="text"
        //                         className="profile-data focus:outline-none"
        //                         placeholder="Edit your address"
        //                     />
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Phone</h1>
        //                     <input
        //                         type="text"
        //                         className="profile-data focus:outline-none"
        //                         placeholder="Edit your number"
        //                     />
        //                 </div>
        //                 <div className="information">
        //                     <h1 className="profile-title">Birthdate</h1>
        //                     <p className="profile-data">01 / 01 / 91</p>
        //                 </div>
        //             </div>
        //             <button
        //                 className="solid-button w-[80%] py-3"
        //                 onClick={() => setIsEditClicked(!isEditClicked)}
        //             >
        //                 Save Changes
        //             </button>
        //         </section>
        //     )}
        // </>
    )
}
