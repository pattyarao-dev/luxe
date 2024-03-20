'use client'
import React, { useEffect, useState } from 'react';
import RewardVerificationForm from '@/components/reusable/rewardVerificationForm';
const QRScanner: React.FC = () => {
    let scanner: any; // Declare scanner variable in the scope of the component
    const [qrcontent, setQrContent] = useState<string>('')
    const [clientId, setClientId] = useState<string>('');
    const [rewardId, setRewardId] = useState<string>('');

    useEffect(() => {
        // Import HTML5-QRCode library script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize QR scanner
            scanner = new (window as any).Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 500,
                    height: 500,
                },
                fps: 20,
            });

            scanner.render(success, error);
        };

        return () => {
            // Cleanup function
            if (scanner) {
                scanner.clear(); // Clear scanner if it exists
            }
            document.body.removeChild(script);
        };
    }, []);

    const success = (result: string) => {
        setQrContent(result)
        const [clientIdString, rewardIdString] = result.split('-');
        setClientId(clientIdString)
        setRewardId(rewardIdString)
        if (scanner) {
            scanner.clear(); // Stop scanning
        }
        // Additional logic if needed
    };

    const error = (err: any) => {
        // console.error(err);
        // Additional error handling if needed
    };

    return (
        <>
            <h1>TEST</h1>
            <div id="reader"></div>
            {qrcontent && (
                <RewardVerificationForm clientid={clientId} rewardid={rewardId} />
            )}
        </>
    );
};

export default QRScanner;
