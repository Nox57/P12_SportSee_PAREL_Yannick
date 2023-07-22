import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import './ScorePieChart.css'

const ContentLegend = (props) => {
    const { payload } = props

    return (
        <div>
            {payload.map((entry, index) => {
                if (entry.value === 'Score') {
                    return (
                        <p key={`item-${index}`} className="score_legend">
                            Score
                        </p>
                    )
                }
                return null
            })}
        </div>
    )
}

const ScorePieChart = ({ score }) => {
    const userScore = [
        { name: 'Score', value: score * 100 },
        { name: 'Reste', value: (1 - score) * 100 },
    ]

    return (
        <div className="score_container">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={userScore}
                        dataKey="value"
                        startAngle={200}
                        endAngle={-200}
                        innerRadius="80%"
                        outerRadius="90%"
                        cornerRadius="50%"
                    >
                        <Cell fill="#ff0000" stroke="#ff0000" />{' '}
                        <Cell fill="transparent" stroke="transparent" />
                    </Pie>
                    <Pie
                        data={[{ value: 100 }]}
                        dataKey="value"
                        startAngle={200}
                        endAngle={-200}
                        outerRadius="80%"
                        fill="#ffffff"
                    />
                    <Legend verticalAlign="top" content={ContentLegend} />
                </PieChart>
            </ResponsiveContainer>
            <div className="score_label">
                <p className="score_number">{Math.round(score * 100)}%</p>
                <p className="score_text">de votre objectif</p>
            </div>
        </div>
    )
}

export default ScorePieChart
