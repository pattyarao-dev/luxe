'use client'
import React, { useEffect } from 'react';

const QRScanner: React.FC = () => {
  useEffect(() => {
    // Import HTML5-QRCode library script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize QR scanner
      const scanner = new (window as any).Html5QrcodeScanner('reader', {
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
      document.body.removeChild(script);
    };
  }, []);

  const success = (result: string) => {
    document.getElementById('result')!.innerHTML = `
      <h2>Success!</h2>
      <p><a href="${result}">${result}</a></p>
    `;
    // Additional logic if needed
  };

  const error = (err: any) => {
    console.error(err);
    // Additional error handling if needed
  };

  return (
    <main>
      <div id="reader"></div>
      <div id="result"></div>
    </main>
  );
};

export default QRScanner;

