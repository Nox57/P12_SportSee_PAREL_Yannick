import React from 'react'
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer,
} from 'recharts'
import './ActivityBarChart.css'

const ActivityBarChart = ({ activityData }) => {
    if (!Array.isArray(activityData)) {
        console.log(activityData)
        return <div>Données non disponibles</div>
    }

    const minKg = Math.min(...activityData.map((item) => item.kilogram)) - 1
    const minCalories =
        Math.min(...activityData.map((item) => item.calories)) - 1

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].value}Kg`}</p>
                    <p className="label">{`${payload[1].value}kCal`}</p>
                </div>
            )
        }

        return null
    }

    const formatXAxis = (tickItem) => {
        return new Date(tickItem).getDate() // extracts day of the month
    }

    return (
        <div className="activity_container">
            <h2>Activité quotidienne</h2>
            <p className="legend_container">
                <span className="grey">●</span>Poids (kg)
                <span className="red">●</span>Calories brûlées (kCal)
            </p>
            <ResponsiveContainer height={250}>
                <BarChart
                    data={activityData}
                    barGap={8}
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickFormatter={formatXAxis} />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#9B9EAC"
                        domain={[minKg, 'auto']}
                        axisLine={false}
                        tickLine={false}
                        tickCount={3}
                    />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#82ca9d"
                        domain={[minCalories, 'auto']}
                        hide
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        yAxisId="right"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={7}
                        radius={[3.5, 3.5, 0, 0]}
                    />
                    <Bar
                        yAxisId="left"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={7}
                        radius={[3.5, 3.5, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ActivityBarChart
