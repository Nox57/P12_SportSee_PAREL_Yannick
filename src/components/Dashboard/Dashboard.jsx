import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import KeyData from '../KeyData/KeyData'
// Services
import UserDataService from '../../services/UserDataService'
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
    const { id: userId } = useParams()

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const user = await UserDataService.getUserData(userId)
            setCurrentUser(user)
            setLoading(false)
        }

        if (userId) {
            fetchData()
        }
    }, [userId])

    if (loading) {
        return (
            <main className="dashboard">
                <h1>Chargement des données...</h1>
            </main>
        )
    }

    // Si userId est indéfini ou vide, on retourne une erreur
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

    if (!currentUser) {
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
                        <ActivityBarChart
                            activityData={currentUser.activity.sessions}
                        />
                    </div>
                    <div className="charts-bottom">
                        <SessionsLineChart
                            sessions={currentUser.averageSessions.sessions}
                        />
                        <PerformanceRadarChart
                            performanceData={currentUser.performance}
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
