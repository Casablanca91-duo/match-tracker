import { useEffect, useState } from "react";
import './matchTracker.css';


function MatchTracker() {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

   
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://app.ftoyd.com/fronttemp-service/fronttemp');
                if (!response.ok) {
                    throw new Error('Ошибка: не удалось загрузить информацию');
                }
                const data = await response.json();
                setMatches(data.data.matches);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchMatches()
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setError(null);
        setMatches([]);
        fetchMatches()
    };

    return (
        <div className="app">
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="header">
                <h1>Match Tracker</h1>
                <button onClick={handleRefresh} disabled={loading}>Обновить</button>
            </div>
            <ul>
                {matches.map(match => (
                    <li key={match.title}>
                        <div >
                            <ul className="listGames">
                                <li><strong>{match.awayTeam.name}</strong></li>
                                <li>
                                    <div>
                                        <ul className="score">
                                            <li><p>{match.homeScore} : {match.awayScore}</p></li>
                                            <li style={{marginTop: '-5px'}}>{match.status === 'Finished' || match.status === 'Scheduled' ? (<span className="scoreResultGreen"> {match.status}</span> ) : (<span className="scoreResultRed"> {match.status}</span>)}</li>
                                        </ul>
                                    </div>
                                </li>
                                <li><strong>{match.homeTeam.name}</strong></li>
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchTracker;
