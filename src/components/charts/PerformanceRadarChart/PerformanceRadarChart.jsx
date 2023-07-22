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
    const translateAndOrderKind = {
        intensity: 'Intensité',
        speed: 'Vitesse',
        strength: 'Force',
        endurance: 'Endurance',
        energy: 'Energie',
        cardio: 'Cardio',
    }

    const order = Object.values(translateAndOrderKind)

    // Transformer les données pour les rendre utilisables avec Recharts
    const transformedData = performanceData.data
        .map((item) => {
            return {
                userId: performanceData.userId,
                kind:
                    translateAndOrderKind[performanceData.kind[item.kind]] ||
                    performanceData.kind[item.kind],
                value: item.value,
            }
        })
        .sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind))

    return (
        <div className="radar_container">
            <RadarChart
                outerRadius={85}
                data={transformedData}
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
