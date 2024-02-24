import React from 'react'

export default function ViewRewards() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-7 px-10 py-10">
            <h1 className="w-full px-10 text-4xl font-bold text-center">Brand 1</h1>
            <div className='w-full flex flex-row justify-end'>
                <div className='flex gap-2'>
                    <button className='px-5 gradient-button'>Add a Reward</button>
                    <button className='px-5 outlined-button'>Delete a Reward</button>
                </div>
            </div>
            <div className='w-full flex flex-row justify-end'>
                <div className='flex gap-2'>
                    <button className='px-5 outlined-button'>status: all</button>
                    <button className='px-5 outlined-button'>capacity: all</button>
                    <button className='px-5 outlined-button'>sort: recently added</button>
                    <button className='px-5 outlined-button'>Search a reward</button>
                </div>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className='text-2xl'>
                    <th className='text-start'>Rewards</th>
                    <th className='text-start'>Expiry Date</th>
                    <th className='text-start'>Capacity</th>
                    <th className='text-start'>Status</th>
                    </tr>
                </thead>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <tbody>
                    <tr className='text-lg'>
                    <td>Reward 1</td>
                    <td>Reward 2</td>
                    <td>Reward 3</td>
                    <td>Reward 3</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    <td>MM/DD/YYYY</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    </tr>
                    <tr className='text-lg'>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    <td>ACTIVE</td>
                    </tr>
                </tbody>
            </table>
            {/* <div className='w-full flex flex-row justify-between'>
                <h1 className='text-2xl text-start'>Rewards</h1>
                <div className='flex flex-row'>
                    <h1 className='text-2xl'>Expiry Date</h1>
                    <h1 className='text-2xl'>Expiry Date</h1>
                    <h1 className='text-2xl'>Expiry Date</h1>
                </div>
            </div> */}
        </div>
    )
}