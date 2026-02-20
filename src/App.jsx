import { useState, useEffect } from "react";
import Login from "./pages/Login";
import HostDashboard from "./pages/HostDashboard";
import CharacterList from "./components/CharacterList";
import TeamBuilder from "./components/TeamBuilder";
import ScoreBoard from "./components/ScoreBoard";
import { loadCharacters } from "./utils/csvLoader";
import { calculateScore } from "./utils/scoring";
import { validateTeam } from "./utils/validation";

const categories = [
  "Leader",
  "Strategist",
  "Tank",
  "Support",
  "Offence"
];

export default function App() {
  // 🔐 Auth State
  const [role, setRole] = useState(localStorage.getItem("role"));

  // 🧠 Game State
  const [characters, setCharacters] = useState([]);
  const [team, setTeam] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  // 📥 Load CSV once
  useEffect(() => {
    loadCharacters(setCharacters);
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    setRole(null);
  };

  // 🧮 Calculate Score
  const handleCalculate = () => {
    setError("");
    setScore(null);

    const validationError = validateTeam(team);
    if (validationError) {
      setError(validationError);
      return;
    }

    const finalScore = calculateScore(team, assignments);
    setScore(finalScore);
  };

  // 💾 Save Team (LocalStorage)
  const saveTeam = () => {
    const username = localStorage.getItem("currentUser");
    if (!username) return;

    const allTeams =
      JSON.parse(localStorage.getItem("teams")) || {};

    allTeams[username] = {
      team,
      assignments,
      score
    };

    localStorage.setItem("teams", JSON.stringify(allTeams));

    alert("Team saved successfully!");
  };

  // 🔐 Not Logged In
  if (!role) {
    return (
      <div className="center">
        <Login setRole={setRole} />
      </div>
    );
  }

  // 👑 Host View
  if (role === "host") {
    return (
      <div className="dashboard">
        <div className="top-bar">
          <h1>Anime Auction - Host Panel</h1>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <HostDashboard />
      </div>
    );
  }

  // 👤 Guest View
  return (
    <div className="dashboard">

      <div className="top-bar">
        <h1>Anime Auction</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Character Pool */}
      <section className="panel">
        <h2>Character Pool</h2>
        <CharacterList
          characters={characters}
          team={team}
          setTeam={setTeam}
        />
      </section>

      {/* Team Builder */}
      <section className="panel">
        <h2>Your Team</h2>
        <TeamBuilder
          team={team}
          setTeam={setTeam}
          assignments={assignments}
          setAssignments={setAssignments}
          categories={categories}
        />
      </section>

      {/* Score Section */}
      <section className="panel score-panel">
        <ScoreBoard
          score={score}
          onCalculate={handleCalculate}
        />

        {score !== null && (
          <button className="primary-btn" onClick={saveTeam}>
            Save Team
          </button>
        )}

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}
      </section>

    </div>
  );
}