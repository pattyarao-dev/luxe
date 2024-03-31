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
    brand_id: any

}

interface ChartData {
    labels: string[]
    subs: number[]
}

const SubsLineChart: React.FC<ChartParams> = ({
    brand_id
}) => {
    const [chartData, setChartData] = useState<ChartData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
    
                const response = await fetch(`api/subsline?id=${brand_id}`);
    
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
    
                const data = await response.json();
                console.log("hahahahhHSHSHHA", data);
                setChartData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [brand_id]);
    

    return (
        <>
            {chartData && (
                <Line
                    data={{
                        labels: chartData.labels,
                        datasets: [
                            {
                                data: chartData.subs,
                                backgroundColor: "purple"
                            }
                        ]
                    }}
                />
            )}
        </>
    )
}

export default SubsLineChart
