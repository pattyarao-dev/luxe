"use client"

import React, { useState, useEffect, useRef } from "react"
import QRCode from "qrcode"

interface RewardActionsProps {
    qr_string: string
}

const RewardActions: React.FC<RewardActionsProps> = ({ qr_string }) => {
    const [src, setSrc] = useState<string>("")
    const [showQR, setShowQR] = useState<boolean>(false)

    useEffect(() => {
        generateQR()
    }, [qr_string])

    const generateQR = () => {
        QRCode.toDataURL(qr_string)
            .then((url) => {
                setSrc(url)
            })
            .catch((error) => {
                console.error("Error generating QR code:", error)
            })
    }

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            window.scrollTo({
                behavior: "smooth"
            })
        }
    }

    const handleClaimNowClick = () => {
        setShowQR(!showQR) // Toggle the state to show/hide QR code
    }

    return (
        <div className="w-full p-5 flex flex-col gap-4">
            {/* <div className="" onClick={handleClaimNowClick}>
                <p>claim now</p>
            </div> */}
            <button
                onClick={handleClaimNowClick}
                className={`w-full border border-dark-purple py-3 rounded-md uppercase font-bold transition ease-in-out duration-100 ${
                    showQR ? "bg-dark-purple text-white" : "bg-white"
                }`}
            >
                Claim Now
            </button>
            {showQR && (
                <div className="w-full flex justify-center bg-white drop-shadow-md">
                    <div className="w-fit ">
                        <img
                            src={src}
                            alt="QR Code"
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default RewardActions
