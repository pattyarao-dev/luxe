import React from 'react'

export default function SignupComp() {
  return (
    <div className="w-2/3 flex justify-center flex-col gap-20">
            <h1 className="gradient-text text-4xl font-bold">Luxe</h1>
            <div className="w-full flex flex-col items-center gap-6">
                <input type="text" placeholder="email" className="input-style drop-shadow-dark-purple" />
                <input type="password" placeholder="password" className="input-style drop-shadow-dark-purple" />
                <input type="password" placeholder="confirm password" className="input-style drop-shadow-dark-purple" />
                <input type="text" placeholder="invite code" className="input-style drop-shadow-dark-purple" />
            </div>
           <button className="gradient-button">Sign up</button>
        </div>
  )
}
