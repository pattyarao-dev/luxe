import React from 'react'
import { useState } from 'react';

interface userDetailsType {
    name: string;
    email: string;
    address: string;
    phone: number;
    birthdate: Date;
}

export default function ProfileDetails() {

    const [isEditClicked, setIsEditClicked] = useState<boolean>(false)

  return (
    <>
        {isEditClicked ? (
        <section className="mt-40 w-full flex flex-col justify-center items-center gap-10">
            <div className="w-[80%] border border-dark-pink px-6 py-8 flex flex-col gap-2 rounded-xl drop-shadow-dark-pink bg-white">
                <div className="information">
                    <h1 className="profile-title">Name</h1>
                    <p className="profile-data">Juan Dela Cruz</p>
                </div>
                <div className="information">
                    <h1 className="profile-title">Email</h1>
                    <p className="profile-data">jdelacruz@gmail.com</p>
                </div>
                <div className="information">
                    <h1 className="profile-title">Address</h1>
                    <p className="profile-data">Metro Manila, Philippines</p>
                </div>
                <div className="information">
                    <h1 className="profile-title">Phone</h1>
                    <p className="profile-data">123456</p>
                </div>
                <div className="information">
                    <h1 className="profile-title">Birthdate</h1>
                    <p className="profile-data">01 / 01 / 91</p>
                </div>
            </div>
            <button className="gradient-button w-[80%] py-3" onClick={() => setIsEditClicked(!isEditClicked)}>Edit Profile</button>
        </section>
    ) : (
        <section className="mt-40 w-full flex flex-col justify-center items-center gap-10">
        <div className="w-[80%] border border-dark-pink px-6 py-8 flex flex-col gap-2 rounded-xl drop-shadow-dark-pink bg-white">
            <div className="information">
                <h1 className="profile-title">Name</h1>
                <p className="profile-data">Juan Dela Cruz</p>
            </div>
            <div className="information">
                <h1 className="profile-title">Email</h1>
                <p className="profile-data">jdelacruz@gmail.com</p>
            </div>
            <div className="information">
                <h1 className="profile-title">Address</h1>
                <p className="profile-data">Metro Manila, Philippines</p>
            </div>
            <div className="information">
                <h1 className="profile-title">Phone</h1>
                <p className="profile-data">123456</p>
            </div>
            <div className="information">
                <h1 className="profile-title">Birthdate</h1>
                <p className="profile-data">01 / 01 / 91</p>
            </div>
        </div>
        <button className="solid-button w-[80%] py-3" onClick={() => setIsEditClicked(!isEditClicked)}>Save Changes</button>
    </section>
    )}
    </>
    
  )
  
}
