'use client'
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface RewardActionsProps {
  qr_string: string;
}

const RewardActions: React.FC<RewardActionsProps> = ({ qr_string }) => {
  const [src, setSrc] = useState<string>('');
  const [showQR, setShowQR] = useState<boolean>(false);

  useEffect(() => {
    generateQR();
  }, [qr_string]);

  const generateQR = () => {
    QRCode.toDataURL(qr_string)
      .then((url) => {
        setSrc(url);
      })
      .catch((error) => {
        console.error('Error generating QR code:', error);
      });
  };

  const handleClaimNowClick = () => {
    setShowQR(!showQR); // Toggle the state to show/hide QR code
  };

  return (
    <>
      <button className="gradient-button" onClick={handleClaimNowClick}>
        Claim Now
      </button>
      <button className="outlined-button">Add to Favorites</button>

      {showQR && src && <img src={src} alt="QR Code" />}
    </>
  );
};

export default RewardActions;

