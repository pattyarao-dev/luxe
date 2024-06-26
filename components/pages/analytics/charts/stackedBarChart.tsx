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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Tooltip
)

interface ChartParams {
    _id: string
    user_type: string
    brand: string
    branch: string
    start_date: string
    end_date: string
}

interface ChartData {
    labels: string[]
    discountClaims: number[]
    freebiesClaims: number[]
}

const StackedBarChart: React.FC<ChartParams> = ({
    _id,
    user_type,
    brand,
    branch,
    start_date,
    end_date
}) => {
    const [chartData, setChartData] = useState<ChartData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `api/analytics/stackedbar?id=${_id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user_type,
                            brand,
                            branch,
                            start_date,
                            end_date
                        })
                    }
                )

                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }

                const data: ChartData = await response.json()
                console.log(data)
                setChartData(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [_id, user_type, brand, branch, start_date, end_date])

    return (
        <>
            {chartData && (
                <Bar
                    data={{
                        labels: chartData.labels,
                        datasets: [
                            {
                                label: "DISCOUNT",
                                data: chartData.discountClaims,
                                backgroundColor: "purple"
                            },
                            {
                                label: "FREEBIES",
                                data: chartData.freebiesClaims,
                                backgroundColor: "orange"
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
            )}
        </>
    )
}

export default StackedBarChart
