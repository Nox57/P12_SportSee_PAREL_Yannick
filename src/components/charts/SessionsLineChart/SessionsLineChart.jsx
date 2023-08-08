import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import './SessionsLineChart.css'

const SessionsLineChart = ({ sessions }) => {
    // Mapping des jours de la semaine
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].value} min`}</p>
                </div>
            )
        }

        return null
    }

    return (
        <div className="sessions_container">
            <h2>Durée moyenne des sessions</h2>
            <LineChart
                width={258}
                height={263}
                data={sessions}
                margin={{
                    top: 100,
                    right: 0,
                    left: 0,
                    bottom: 10,
                }}
            >
                <XAxis
                    dataKey="day"
                    tick={{ fill: '#FFFFFF', opacity: '0.5' }}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: -20, right: -20 }} // Ajout d'un padding négatif pour lisser la courbe et ne pas afficher 0 et 8
                    tickFormatter={(day) =>
                        day === 0 || day === 8 ? '' : daysOfWeek[day - 1]
                    } // Jour de la semaine correspondant, vides pour les jours 0 et 8
                />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="sessionLength"
                    stroke="#ffffff"
                    activeDot={{ r: 7 }}
                    dot={false}
                />
            </LineChart>
        </div>
    )
}

export default SessionsLineChart
