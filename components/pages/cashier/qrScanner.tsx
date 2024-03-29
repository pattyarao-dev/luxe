"use client"
import React, { useEffect, useState } from "react"
import RewardVerificationForm from "@/components/reusable/rewardVerificationForm"

interface TokenContent {
    _id: string
    user_type: string
}

const QRScanner: React.FC<TokenContent> = ({ _id, user_type }) => {
    let scanner: any // Declare scanner variable in the scope of the component
    const [qrcontent, setQrContent] = useState<string>("")
    const [clientId, setClientId] = useState<string>("")
    const [rewardId, setRewardId] = useState<string>("")

    useEffect(() => {
        // Import HTML5-QRCode library script
        const script = document.createElement("script")
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            // Initialize QR scanner
            scanner = new (window as any).Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 800,
                    height: 800
                },
                fps: 20
            })

            scanner.render(success, error)
        }

        return () => {
            // Cleanup function
            if (scanner) {
                scanner.clear() // Clear scanner if it exists
            }
            document.body.removeChild(script)
        }
    }, [])

    const success = (result: string) => {
        setQrContent(result)
        const [clientIdString, rewardIdString] = result.split("-")
        setClientId(clientIdString)
        setRewardId(rewardIdString)
        if (scanner) {
            scanner.clear() // Stop scanning
        }
        // Additional logic if needed
    }

    const error = (err: any) => {
        // console.error(err);
        // Additional error handling if needed
    }

    return (
        <div className="w-full min-h-screen primary-background">
            {qrcontent ? (
                <RewardVerificationForm
                    clientid={clientId}
                    rewardid={rewardId}
                    cashierid={_id}
                />
            ) : (
                <>
                    <h1 className="w-full p-4 bg-gradient-to-br from-dark-pink to-dark-purple text-white font-bold text-2xl">
                        QR CODE SCAN
                    </h1>
                    <div id="section">
                        <div id="reader"></div>
                    </div>
                </>
            )}
        </div>
    )
}

export default QRScanner
