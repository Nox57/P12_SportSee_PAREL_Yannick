import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import KeyData from '../KeyData/KeyData'
// Hooks
import useFetch from '../../hooks/useFetch'
// Mocked Data
import {
    USER_MAIN_DATA,
    USER_PERFORMANCE,
    USER_AVERAGE_SESSIONS,
    USER_ACTIVITY,
} from '../../datas/data.js'
// Css
import './Dashboard.css'
// Assets
import CaloriesImg from '../../assets/calories.svg'
import ProteineImg from '../../assets/proteine.svg'
import GlucidesImg from '../../assets/glucides.svg'
import LipidesImg from '../../assets/lipides.svg'
import ScorePieChart from '../charts/ScorePieChart/ScorePieChart'
import PerformanceRadarChart from '../charts/PerformanceRadarChart/PerformanceRadarChart'
import SessionsLineChart from '../charts/SessionsLineChart/SessionsLineChart'
import ActivityBarChart from '../charts/ActivityBarChart/ActivityBarChart'

function Dashboard() {
    const { id: userId } = useParams() // Récupérer l'ID de l'utilisateur de la route
    const { data, error } = useFetch(`http://localhost:3000/user/${userId}`)
    const { data: performanceData, error: performanceError } = useFetch(
        `http://localhost:3000/user/${userId}/performance`
    )
    const { data: sessionsData, error: sessionsError } = useFetch(
        `http://localhost:3000/user/${userId}/average-sessions`
    )
    const { data: activityData, error: activityError } = useFetch(
        `http://localhost:3000/user/${userId}/activity`
    )

    const [currentUser, setCurrentUser] = useState(null)
    const [userPerformance, setUserPerformance] = useState(null)
    const [userSessions, setUserSessions] = useState(null)
    const [userActivity, setUserActivity] = useState(null)

    useEffect(() => {
        if (!error && data) {
            // On utilise les données de l'API si elles sont disponibles et si aucune erreur n'est survenue
            console.log("Données de l'API")
            setCurrentUser(data.data)
        } else {
            // On utilise les données mockées si une erreur s'est produite lors de la récupération des données de l'API
            console.log('Données mockées')
            setCurrentUser(USER_MAIN_DATA[0])
        }
    }, [data, error])

    useEffect(() => {
        if (!performanceError && performanceData) {
            setUserPerformance(performanceData.data)
        } else {
            setUserPerformance(USER_PERFORMANCE[0])
        }
    }, [performanceData, performanceError])

    useEffect(() => {
        if (!sessionsError && sessionsData && sessionsData.data) {
            setUserSessions(sessionsData.data.sessions)
        } else {
            const sessions = USER_AVERAGE_SESSIONS.find(
                (session) => session.userId === Number(userId)
            )
            setUserSessions(sessions ? sessions.sessions : [])
        }
    }, [sessionsData, sessionsError, userId])

    useEffect(() => {
        if (!activityError && activityData.data) {
            setUserActivity(activityData.data.sessions)
        } else {
            const activity = USER_ACTIVITY.find(
                (activity) => activity.userId === Number(userId)
            )
            setUserActivity(activity ? activity.sessions : [])
        }
    }, [activityData, activityError, userId])

    // Si userId est indéfini ou vide, on retourne une erreur ou on peut rediriger vers une autre page.
    if (!userId) {
        return (
            <main className="dashboard">
                <h1>Aucun utilisateur saisi</h1>
                <p>
                    Veuillez ajouter " /user/"ID de l'utilisateur" " dans l'URL.
                </p>
            </main>
        )
    }

    if (!currentUser || !userPerformance || !userSessions) {
        return (
            <main className="dashboard">
                <h1>Aucun utilisateur trouvé</h1>
            </main>
        )
    }

    return (
        <main className="dashboard">
            <h1>
                Bonjour{' '}
                {currentUser ? (
                    <span>{currentUser.userInfos.firstName}</span>
                ) : (
                    ''
                )}
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            <div className="container">
                <div className="charts">
                    <div className="chart-top">
                        <ActivityBarChart activityData={userActivity} />
                    </div>
                    <div className="charts-bottom">
                        <SessionsLineChart sessions={userSessions} />
                        <PerformanceRadarChart
                            performanceData={userPerformance}
                        />
                        <ScorePieChart
                            score={currentUser.todayScore || currentUser.score}
                        />
                    </div>
                </div>
                <div className="nutriments">
                    {currentUser && (
                        <>
                            <KeyData
                                name="Calories"
                                value={`${currentUser.keyData.calorieCount}kCal`}
                                img={CaloriesImg}
                            />
                            <KeyData
                                name="Protéines"
                                value={`${currentUser.keyData.proteinCount}g`}
                                img={ProteineImg}
                            />
                            <KeyData
                                name="Glucides"
                                value={`${currentUser.keyData.carbohydrateCount}g`}
                                img={GlucidesImg}
                            />
                            <KeyData
                                name="Lipides"
                                value={`${currentUser.keyData.lipidCount}g`}
                                img={LipidesImg}
                            />
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Dashboard
