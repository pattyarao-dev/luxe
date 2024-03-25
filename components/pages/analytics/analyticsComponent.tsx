"use client"
import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'

export default function AnalyticsComp(){

    return (
        <div className='w-full flex flex-col justify-center items-center gap-8 p-20'>
            <h1 className='w-full px-10 text-4xl font-bold text-center'>Rewards Dashboard</h1>
            <div className='w-1/3 flex flex-row gap-4'>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>DATE RANGE FILTER</button>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>BRAND FILTER</button>
            </div>
            <div className='w-1/2 grid grid-cols-3 gap-5'>
                <div className='h-full gradient-background rounded-md border-solid border-2'>
                    <h1>Total Claims</h1>
                </div>
                <div className='h-full gradient-background rounded-md border-solid border-2'>
                    <h1>Total Claims by Reward Type</h1>
                </div>
                <div className='h-full gradient-background rounded-md border-solid border-2'>
                    <h1>Total Claims by Brand</h1>
                </div>
                <div className='h-full gradient-background rounded-md border-solid border-2'>
                    <h1>Generated Sales</h1>
                </div>
                <div className='h-full col-span-2 gradient-background rounded-md border-solid border-2'>
                    <h1>Number of Claims Over Time</h1>
                </div>
            </div>
        </div>
    )
}