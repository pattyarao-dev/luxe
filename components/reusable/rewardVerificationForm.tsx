'use client'
import React, { useEffect, useState } from 'react';

interface QRContentProps {
    clientid: string;
    rewardid: string;
}

const RewardVerificationForm: React.FC<QRContentProps> = ({ clientid, rewardid }) => {
    const [reward, setReward] = useState<any>(null); // State to hold the fetched reward

    useEffect(() => {
        const fetchReward = async () => {
            try {
                // Fetch reward data from the API endpoint
                const response = await fetch(`/api/reward/get?id=${rewardid}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch reward');
                }
                setReward(data.reward);
            } catch (error) {
                console.error('Error fetching reward:', error);
                setReward(null); // Set reward to null in case of error
            }
        };

        fetchReward(); // Call the fetchReward function
    }, [rewardid]);

    return (
        <>
            <h2>Scanned QR Content:</h2>
            <p>Client ID: {clientid}</p>
            <p>Reward ID: {rewardid}</p>
            {reward && (
                <div>
                    <h3>Reward Details:</h3>
                    <p>Name: {reward.reward_name}</p>
                    <p>Brand: {reward.brand_name}</p>
                    {/* Add more reward details here as needed */}
                </div>
            )}
        </>
    );
};

export default RewardVerificationForm;
