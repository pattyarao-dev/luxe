import React from 'react'

export default function Login() {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center flex-col gradient-background">
        <div className="w-2/3 flex justify-center flex-col gap-20">
            <h1 className="gradient-text text-4xl font-bold uppercase">Luxe</h1>
            <div className="w-full flex flex-col items-center gap-6">
                <input type="text" placeholder="email" className="input-style drop-shadow-dark-purple" />
                <input type="text" placeholder="password" className="input-style drop-shadow-dark-purple" />
            </div>
            <button className="gradient-button">Login</button>
        </div>
    </main>
  )
}

