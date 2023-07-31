// Données mockées
// import {
//     USER_MAIN_DATA,
//     USER_PERFORMANCE,
//     USER_AVERAGE_SESSIONS,
//     USER_ACTIVITY,
// } from '../datas/data.js'
// Modélisation des données utilisateur
import User from '../models/User'

class UserDataService {
    static async getUserData(userId) {
        const urls = [
            fetch(`http://localhost:3000/user/${userId}`).then((res) =>
                res.json()
            ),
            fetch(`http://localhost:3000/user/${userId}/performance`).then(
                (res) => res.json()
            ),
            fetch(`http://localhost:3000/user/${userId}/average-sessions`).then(
                (res) => res.json()
            ),
            fetch(`http://localhost:3000/user/${userId}/activity`).then((res) =>
                res.json()
            ),
        ]

        try {
            const [
                userMainData,
                userPerformance,
                userAverageSessions,
                userActivity,
            ] = await Promise.all(urls)

            // Si l'utilisateur n'est pas trouvé dans les données de l'API, on renvoie null
            if (!userMainData.data) {
                return null
            }

            return new User(
                userMainData.data.id,
                userMainData.data.userInfos,
                userMainData.data.todayScore || userMainData.data.score,
                userMainData.data.keyData,
                userPerformance.data,
                userAverageSessions.data,
                userActivity.data
            )
        } catch (error) {
            console.log(error)
            throw error
            // Si on a une erreur, on utilise les données mockées
            // const mockData = {
            //     id: USER_MAIN_DATA.find((user) => user.id === Number(userId)),
            //     performance: USER_PERFORMANCE.find(
            //         (user) => user.userId === Number(userId)
            //     ),
            //     averageSessions: USER_AVERAGE_SESSIONS.find(
            //         (user) => user.userId === Number(userId)
            //     ),
            //     activity: USER_ACTIVITY.find(
            //         (user) => user.userId === Number(userId)
            //     ),
            // }

            // // Si l'utilisateur n'est pas trouvé dans les données mockées, on renvoie null
            // if (!mockData.id) {
            //     return null
            // }

            // return new User(
            //     mockData.id.id,
            //     mockData.id.userInfos,
            //     mockData.id.todayScore || mockData.id.score,
            //     mockData.id.keyData,
            //     mockData.performance,
            //     mockData.averageSessions,
            //     mockData.activity
            // )
        }
    }
}

export default UserDataService
