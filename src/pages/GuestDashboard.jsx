import { useEffect, useState } from "react";
import { loadCharacters } from "../utils/csvLoader";
import { calculateScore } from "../utils/scoring";
import { validateTeam } from "../utils/validation";

const categories = [
  "Leader",
  "Strategist",
  "Tank",
  "Support",
  "Offence"
];

export default function GuestDashboard() {

  const [characters, setCharacters] = useState([]);
  const [team, setTeam] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    loadCharacters(setCharacters);
  }, []);

  const addCharacter = (char) => {
    if (team.find(c => c.Character === char.Character)) return;
    setTeam([...team, char]);
  };

  const calculateFinal = () => {

    const error = validateTeam(team);
    if (error) {
      alert(error);
      return;
    }

    const finalScore = calculateScore(team, assignments);
    setScore(finalScore);

    saveTeam(finalScore);
  };

  const saveTeam = (finalScore) => {

    const username = localStorage.getItem("currentUser");
    const teams = JSON.parse(localStorage.getItem("teams")) || [];

    teams.push({
      username,
      team,
      score: finalScore
    });

    localStorage.setItem("teams", JSON.stringify(teams));
  };

  return (
    <div>
      <h1>Build Your Team</h1>

      <h3>Character Pool</h3>
      {characters.slice(0, 30).map((c, i) => (
        <div key={i}>
          {c.Character} ({c.Anime}) - {c.Rating}
          <button onClick={() => addCharacter(c)}>Add</button>
        </div>
      ))}

      <h3>Your Team</h3>
      {team.map((c, i) => (
        <div key={i}>
          {c.Character}
          <select
            onChange={e =>
              setAssignments({
                ...assignments,
                [c.Character]: e.target.value
              })
            }
          >
            <option>Select Category</option>
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={calculateFinal}>
        Calculate Score
      </button>

      {score && <h2>Final Score: {score}</h2>}
    </div>
  );
}