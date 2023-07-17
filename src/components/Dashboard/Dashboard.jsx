import { useState, useEffect } from 'react'
import KeyData from '../KeyData/KeyData'
import './Dashboard.css'
import { USER_MAIN_DATA } from '../../datas/data.js'
import CaloriesImg from '../../assets/calories.svg'
import ProteineImg from '../../assets/proteine.svg'
import GlucidesImg from '../../assets/glucides.svg'
import LipidesImg from '../../assets/lipides.svg'

function Content() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        // données mockées
        setCurrentUser(USER_MAIN_DATA[0])
    }, [])

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
        }
    }, [currentUser])

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

export default Content
