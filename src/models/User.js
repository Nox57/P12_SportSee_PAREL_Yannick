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
}

export default User
