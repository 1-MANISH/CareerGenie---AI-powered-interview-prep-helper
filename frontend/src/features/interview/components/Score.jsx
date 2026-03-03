import "../style/score.scss"

function Score({ score = 0 }) {
        const pct = Math.min(Math.max(score, 0), 100)
        return (
                <div className="scoreBox">
                        <div className="scoreCircle">
                                <span className="scoreNumber">{pct}%</span>
                        </div>
                        <div className="scoreLabel">Match Score</div>
                        <div className="scoreDesc">Strong match for this role</div>
                </div>
        )
}

export default Score