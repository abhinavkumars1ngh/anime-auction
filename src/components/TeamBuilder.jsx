import React from "react";

export default function TeamBuilder({
  team,
  setTeam,
  assignments,
  setAssignments,
  categories
}) {

  const remove = (name) => {
    setTeam(team.filter(c => c.Character !== name));
  };

  return (
    <div className="team-grid">
      {team.map(char => (
        <div key={char.Character} className="team-card">
          <h4>{char.Character}</h4>

          <select
            value={assignments[char.Character] || ""}
            onChange={(e) =>
              setAssignments({
                ...assignments,
                [char.Character]: e.target.value
              })
            }
          >
            <option value="">Select Role</option>
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <button
            className="remove-btn"
            onClick={() => remove(char.Character)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}