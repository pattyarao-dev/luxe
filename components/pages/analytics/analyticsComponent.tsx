"use client"
import React, { Fragment, useState, useEffect, useRef } from "react"
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
import HorizBarChart from "./charts/horizBarChart"
import StackedBarChart from "./charts/stackedBarChart"
import LineChart from "./charts/lineChart"
import SalesChart from "./charts/salesChart"
import ClaimsChart from "./charts/claimsChart"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Tooltip
)

interface Brand {
    _id: string
    brand_name: string
}

interface Branch {
    branch_name: string
}

interface TokenContent {
    _id: string
    user_type: string
}

const AnalyticsComp: React.FC<TokenContent> = ({ _id, user_type }) => {
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [brand, setBrand] = useState<string>("")
    const [branch, setBranch] = useState<string>("")
    const [dropdownOptions, setDropdownOptions] = useState<Brand[]>([])

    useEffect(() => {
        const fetchData = async () => {
            let url = ""

            if (user_type === "ADMIN_ALL") {
                url = `api/analytics/dropdown/dropbrand?id=${_id}`
            } else if (user_type === "ADMIN") {
                url = `api/analytics/dropdown/dropbranch?id=${_id}`
            }

            try {
                const response = await fetch(url)
                const data = await response.json()
                setDropdownOptions(data)
            } catch (error) {
                console.error("Error fetching dropdown options:", error)
            }
        }

        fetchData()
    }, [_id, user_type])

    const handleBrandChange = (e: any) => {
        setBrand(e.target.value)
    }

    const handleBranchChange = (e: any) => {
        setBranch(e.target.value)
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 p-20">
            <h1 className="w-full px-10 text-4xl font-bold text-center">
                Rewards Dashboard
            </h1>
            <div className="w-3/7 flex flex-row gap-4">
                <input
                    type="date"
                    className="w-full border border-gray-300 outlined-button rounded-md p-2 focus:outline-none focus:border-blue-500"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value)
                        console.log("Start Date:", e.target.value)
                    }}
                />

                <input
                    type="date"
                    className="w-full border border-gray-300 outlined-button rounded-md p-2 focus:outline-none focus:border-blue-500"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value)
                        console.log("End Date:", e.target.value)
                    }}
                />

                {user_type === "ADMIN_ALL" && (
                    <select
                        className="border border-gray-300 outlined-button rounded-md p-2 focus:outline-none focus:border-blue-500"
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        <option value="">All Brands</option>
                        {dropdownOptions.map((option) => (
                            <option key={option._id} value={option._id}>
                                {option.brand_name}
                            </option>
                        ))}
                    </select>
                )}

                {user_type === "ADMIN" && (
                    <select
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        value={branch}
                        onChange={handleBranchChange}
                    >
                        <option value="">All Branches</option>
                        {dropdownOptions.map((option: any) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="w-3/4 grid grid-cols-3 gap-5">
                <div className="h-full rounded-xl border-solid border-2 p-5 bg-white drop-shadow-md">
                    <h1 className="text-xl font-semibold">Total Claims</h1>
                    <div className="flex h-4/5 justify-center items-center">
                        <ClaimsChart
                            _id={_id}
                            user_type={user_type}
                            brand={brand}
                            branch={branch}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                </div>
                <div className="h-full rounded-xl border-solid border-2 p-5 bg-white drop-shadow-md">
                    <h1 className="text-xl font-semibold">Total Claims by Reward Type</h1>
                    <div className="p-4">
                        <StackedBarChart
                            _id={_id}
                            user_type={user_type}
                            brand={brand}
                            branch={branch}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                    
                </div>
                <div className="h-full rounded-xl border-solid border-2 p-5 bg-white drop-shadow-md">
                    <h1 className="text-xl font-semibold">Total Claims by Brand</h1>
                    <div className="p-4">
                        <HorizBarChart
                            _id={_id}
                            user_type={user_type}
                            brand={brand}
                            branch={branch}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                    
                </div>
                <div className="h-full rounded-xl border-solid border-2 p-5 bg-white drop-shadow-md">
                    <h1 className="text-xl font-semibold">Generated Sales</h1>
                    <div className="flex h-4/5 justify-center items-center">
                        <SalesChart
                            _id={_id}
                            user_type={user_type}
                            brand={brand}
                            branch={branch}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                    
                </div>
                <div className="h-full col-span-2 rounded-xl border-solid border-2 p-5 bg-white drop-shadow-md">
                    <h1 className="text-xl font-semibold">Number of Claims Over Time</h1>
                    <div className="p-4">
                        <LineChart
                            _id={_id}
                            user_type={user_type}
                            brand={brand}
                            branch={branch}
                            start_date={startDate}
                            end_date={endDate}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AnalyticsComp
