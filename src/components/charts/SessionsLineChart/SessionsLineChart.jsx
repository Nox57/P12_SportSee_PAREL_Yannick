import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import './SessionsLineChart.css'

const SessionsLineChart = ({ sessions }) => {
    // Mapping des jours de la semaine
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

    // Ajouter des données fictives pour les jours 0 et 8 pour "lisser" la courbe et voir L et D
    const completeSessions = [
        { day: 0, sessionLength: 0 },
        ...sessions,
        { day: 8, sessionLength: 0 },
    ]

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
                data={completeSessions}
                margin={{
                    top: 100,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <XAxis
                    dataKey="day"
                    tick={{ fill: '#FFFFFF', opacity: '0.5' }}
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
                />
            </LineChart>
        </div>
    )
}

export default SessionsLineChart
