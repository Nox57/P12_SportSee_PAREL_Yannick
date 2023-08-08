import React from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'
import './PerformanceRadarChart.css'

const PerformanceRadarChart = ({ performanceData }) => {
    return (
        <div className="radar_container">
            <RadarChart
                outerRadius={85}
                data={performanceData}
                width={240}
                height={240}
            >
                <PolarGrid radialLines={false} stroke="#fff" />
                <PolarAngleAxis
                    dataKey="kind"
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <PolarRadiusAxis
                    domain={[0, 5]}
                    axisLine={false}
                    tick={false}
                />
                <Radar
                    dataKey="value"
                    stroke="#ff0000"
                    fill="#ff0000"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </div>
    )
}

export default PerformanceRadarChart
