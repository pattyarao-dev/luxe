"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation"

export default function LoginComp({userType}: {userType: string}) {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {push} = useRouter();

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL! + "/auth")
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Handle response as needed
      const data = await response.json();
      console.log(data); // Log response data
      push("/home");  

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-2/3 flex justify-center flex-col gap-20">
      <h1 className="gradient-text text-4xl font-bold uppercase">Luxe</h1>
      <div className="w-full flex flex-col items-center gap-6">
        {/* Input fields with state */}
        <input
          type="text"
          placeholder="email"
          className="input-style drop-shadow-dark-purple"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input-style drop-shadow-dark-purple"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Submit button */}
      <button className="gradient-button" onClick={handleSubmit}>Login</button>
    </div>
  );
}
