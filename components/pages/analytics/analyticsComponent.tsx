"use client"
import React, { Fragment, useState, useEffect, useRef } from "react"
import { Menu, Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import Image from "next/image"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    BarController,
    BarElement
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Tooltip
)

export default function AnalyticsComp() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 p-10">
            <h1 className="w-full px-10 text-4xl font-bold text-center">
                Rewards Dashboard
            </h1>
            <div className="w-1/3 flex flex-row gap-4">
                <button className="outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white">
                    DATE RANGE FILTER
                </button>
                <button className="outlined-button w-full flex items-center justify-between tracking-wider active:border-white duration-300 active:text-white">
                    BRAND FILTER
                </button>
            </div>
            <div className="w-1/2 grid grid-cols-3 gap-5">
                <div className="h-full gradient-background rounded-md border-solid border-2">
                    <h1>Total Claims</h1>
                </div>
                <div className="h-full rounded-md border-solid border-2">
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
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                x: {
                                    stacked: true
                                },
                                y: {
                                    stacked: true
                                }
                            }
                        }}
                    />
                </div>
                <div className="h-full rounded-md border-solid border-2">
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
                            indexAxis: "y",
                            scales: {
                                x: {
                                    type: "category" // Ensure x-axis is configured as 'category'
                                }
                            }
                        }}
                    />
                </div>
                <div className="h-full rounded-md border-solid border-2">
                    <h1>Generated Sales</h1>
                </div>
                <div className="h-full col-span-2 rounded-md border-solid border-2">
                    <h1>Number of Claims Over Time</h1>
                    <Line
                        data={{
                            labels: [
                                "2024-02-12T18:18:35.957+00:00",
                                "2024-02-13T07:23:42.481+00:00",
                                "2024-02-14T15:55:20.208+00:00",
                                "2024-02-15T09:36:49.729+00:00",
                                "2024-02-16T20:05:32.601+00:00",
                                "2024-02-17T12:47:09.182+00:00",
                                "2024-02-18T01:30:58.733+00:00",
                                "2024-02-19T18:49:27.319+00:00",
                                "2024-02-20T10:25:58.924+00:00",
                                "2024-02-21T23:39:03.007+00:00",
                                "2024-02-22T13:14:39.746+00:00",
                                "2024-02-23T07:05:25.882+00:00",
                                "2024-02-24T19:22:54.136+00:00",
                                "2024-02-25T12:08:29.426+00:00",
                                "2024-02-26T02:40:15.789+00:00",
                                "2024-02-27T17:57:49.374+00:00",
                                "2024-02-28T11:39:10.592+00:00",
                                "2024-02-29T00:55:41.052+00:00",
                                "2024-03-01T16:12:51.604+00:00",
                                "2024-03-02T08:59:14.985+00:00",
                                "2024-03-03T21:21:32.281+00:00",
                                "2024-03-04T15:04:52.835+00:00",
                                "2024-03-05T03:35:18.189+00:00",
                                "2024-03-06T18:52:53.906+00:00",
                                "2024-03-07T12:34:29.457+00:00",
                                "2024-03-08T01:50:59.988+00:00",
                                "2024-03-09T18:08:07.441+00:00",
                                "2024-03-10T10:47:32.827+00:00",
                                "2024-03-11T02:17:42.618+00:00",
                                "2024-03-12T19:38:32.979+00:00",
                                "2024-03-13T13:18:09.529+00:00",
                                "2024-03-14T04:30:55.982+00:00",
                                "2024-03-15T20:48:31.686+00:00",
                                "2024-03-16T14:25:17.011+00:00",
                                "2024-03-17T05:53:45.353+00:00",
                                "2024-03-18T21:11:21.864+00:00",
                                "2024-03-19T14:47:52.275+00:00",
                                "2024-03-20T07:20:10.925+00:00",
                                "2024-03-21T20:31:19.475+00:00",
                                "2024-03-22T12:12:45.697+00:00",
                                "2024-03-23T03:39:26.026+00:00",
                                "2024-03-24T18:53:44.329+00:00",
                                "2024-03-25T10:31:10.821+00:00",
                                "2024-03-26T02:00:32.343+00:00",
                                "2024-03-27T17:18:45.884+00:00",
                                "2024-03-28T09:56:00.451+00:00",
                                "2024-03-29T02:31:08.025+00:00",
                                "2024-03-29T18:41:26.516+00:00",
                                "2024-03-30T10:23:49.035+00:00"
                            ],
                            datasets: [
                                {
                                    data: [
                                        38, 74, 91, 22, 57, 83, 10, 46, 69, 19,
                                        55, 87, 29, 63, 41, 95, 12, 68, 33, 79,
                                        6, 50, 76, 25, 93, 2, 40, 82, 14, 52,
                                        88, 35, 71, 8, 64, 97, 17, 59, 44, 78
                                    ],
                                    backgroundColor: "purple"
                                }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
