import React from 'react'

export default function Brands() {
    return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
        <h1 className="w-full px-10 text-3xl font-bold text-start">Brands</h1>
        <div className="w-full px-10 flex gap-6">
        <div className="w-fit rounded overflow-hidden shadow-lg">
            {/* <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"> */}
            <div className="px-6 py-4 gradient-background">
                <div className="font-bold text-xl mb-2">Brand 1</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
        </div>
        <div className="w-fit rounded overflow-hidden shadow-lg">
            {/* <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"> */}
            <div className="px-6 py-4 gradient-background">
                <div className="font-bold text-xl mb-2">Brand 2</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
        </div>
        <div className="w-fit rounded overflow-hidden shadow-lg">
            {/* <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"> */}
            <div className="px-6 py-4 gradient-background">
                <div className="font-bold text-xl mb-2">Brand 3</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
        </div>
        </div>
        <div className='py-2'>
        <button className='w-fit px-5 py-2 gradient-button'>Add a Brand</button>

        </div>
    </div>
    )
  }