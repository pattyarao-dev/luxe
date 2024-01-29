import React from 'react'
import Image from 'next/image'

export default function IconComp () {
  return (
    <section className="image-section">
        <div className="w-[150px] h-[150px] bg-white rounded-full drop-shadow-lg">
          <Image src="/cuate.png" width={100} height={100} alt="profile pic" className="w-full p-6 flex justify-center items-center" />
        </div>
      </section>
  )
}
