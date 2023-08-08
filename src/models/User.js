class User {
    constructor(
        id,
        userInfos,
        todayScore,
        keyData,
        performance,
        averageSessions,
        activity
    ) {
        this.id = id
        this.userInfos = userInfos
        this.todayScore = todayScore
        this.keyData = keyData
        this.performance = performance
        this.averageSessions = averageSessions
        this.activity = activity
    }

    getUserScore() {
        return [
            { name: 'Score', value: this.todayScore * 100 },
            { name: 'Reste', value: (1 - this.todayScore) * 100 },
        ]
    }

    getTransformedPerformanceData() {
        const translateAndOrderKind = {
            intensity: 'Intensité',
            speed: 'Vitesse',
            strength: 'Force',
            endurance: 'Endurance',
            energy: 'Energie',
            cardio: 'Cardio',
        }

        const order = Object.values(translateAndOrderKind)

        return this.performance.data
            .map((item) => {
                return {
                    userId: this.id,
                    kind:
                        translateAndOrderKind[
                            this.performance.kind[item.kind]
                        ] || this.performance.kind[item.kind],
                    value: item.value,
                }
            })
            .sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind))
    }
}

export default User
