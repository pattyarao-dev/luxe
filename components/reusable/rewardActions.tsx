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
        // <div className="w-full">
        //   <section className="w-full min-h-screen bg-green-200">
        //     <button className="gradient-button" onClick={handleClaimNowClick}>
        //      Claim Now
        //     </button>
        //     <button className="outlined-button">Add to Favorites</button>
        //   </section>

        //   <section id="qrcode__section" className="w-full min-h-screen bg-green-200">
        //     {showQR && src &&
        //       <img src={src} alt="QR Code" />}</section>
        //  </div>

        <div className={`w-full bg-gray-main rounded-md`}>
            <div
                className={`w-full flex justify-between p-4 transition-all duration-300 ease-in-out rounded-t-md font-bold uppercase ${
                    showQR ? "text-white" : "text-yellow-400"
                }`}
                onClick={handleClaimNowClick}
            >
                <p>claim now</p>
            </div>
            <div
                className={`w-full grid overflow-hidden transition-all duration-300 ease-in-out ${
                    showQR === true
                        ? "grid-rows-[1fr] opacity-100 p-6 bg-accent-150 text-white"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <img src={src} alt="QR Code" className="overflow-hidden" />
            </div>
        </div>
    )
}

export default RewardActions
