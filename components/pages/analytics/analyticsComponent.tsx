"use client"
import React, { Fragment, useState, useEffect, useRef } from 'react'
import {Menu, Dialog, Transition} from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    BarController,
    BarElement
  } from "chart.js";
  import { Line, Bar } from "react-chartjs-2";


 ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Tooltip
  );

export default function AnalyticsComp(){

    return (
        <div className='w-full flex flex-col justify-center items-center gap-3 p-10'>
            <h1 className='w-full px-10 text-4xl font-bold text-center'>Rewards Dashboard</h1>
            <div className='w-1/3 flex flex-row gap-4'>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>DATE RANGE FILTER</button>
                <button className='outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white'>BRAND FILTER</button>
            </div>
            <div className='w-1/2 grid grid-cols-3 gap-5'>
                <div className='h-full gradient-background rounded-md border-solid border-2'>
                    <h1>Total Claims</h1>
                </div>
                <div className='h-full rounded-md border-solid border-2'>
                    <h1>Total Claims by Reward Type</h1>
                    <Bar 
                        data={{
                            labels: ["A", "B", "C", "D"],
                            datasets: [
                                {
                                    label: "Revenue", 
                                    data: [200, 300, 400, 500],
                                    backgroundColor: "purple"
                                },
                                {
                                    label: "Loss", 
                                    data: [60, 70, 90, 100]
                                },
                            ]
                        }}
                        options={{
                            scales: {
                                x: {
                                    stacked: true,
                                  },
                                  y: {
                                    stacked: true
                                  }
                            }
                        }}
                    />
                </div>
                <div className='h-full rounded-md border-solid border-2'>
                    <h1>Total Claims by Brand</h1>
                        <Bar 
                            data={{
                                labels: ["A", "B", "C", "D"],
                                datasets: [
                                    {
                                        label: "Revenue", 
                                        data: [200, 300, 400, 500],
                                        backgroundColor: "purple"
                                    }
                                ]
                            }}
                            options={{
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        type: 'category' // Ensure x-axis is configured as 'category'
                                    }
                                }
                            }}
                        />
                </div>
                <div className='h-full rounded-md border-solid border-2'>
                    <h1>Generated Sales</h1>
                </div>
                <div className='h-full col-span-2 rounded-md border-solid border-2'>
                    <h1>Number of Claims Over Time</h1>
                    <Line
                        data={{
                        labels: [
                            "2023-01",
                            "2023-02",
                            "2023-03",
                            "2023-04",
                            "2023-05",
                            "2023-06",
                            "2023-07",
                            "2023-08",
                        ],
                        datasets: [
                            {
                            data: [100, 120, 115, 134, 168, 132, 200, 500, 200, 293, 273, 482, 728],
                            backgroundColor: "purple",
                            },                                                                                                                                    
                        ],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}