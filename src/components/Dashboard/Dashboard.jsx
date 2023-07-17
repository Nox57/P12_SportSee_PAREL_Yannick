import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import KeyData from '../KeyData/KeyData'
// Hooks
import useFetch from '../../hooks/useFetch'
// Mocked Data
import { USER_MAIN_DATA } from '../../datas/data.js'
// Css
import './Dashboard.css'
// Assets
import CaloriesImg from '../../assets/calories.svg'
import ProteineImg from '../../assets/proteine.svg'
import GlucidesImg from '../../assets/glucides.svg'
import LipidesImg from '../../assets/lipides.svg'

function Dashboard() {
    const { id: userId } = useParams() // Récupérer l'ID de l'utilisateur de la route
    const { data, error } = useFetch(`http://localhost:3000/user/${userId}`)
    const [currentUser, setCurrentUser] = useState(null)

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
                        Graphique Poids / Calories brûlées (SimpleBarChart)
                    </div>
                    <div className="charts-bottom">
                        <div>Graphique</div>
                        <div>Graphique (SimpleRadarChart)</div>
                        <div>Graphique KPI</div>
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
