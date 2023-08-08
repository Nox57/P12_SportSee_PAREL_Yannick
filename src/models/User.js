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
}

export default User
