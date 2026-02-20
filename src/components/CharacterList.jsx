import React from "react";

export default function CharacterList({ characters, team, setTeam }) {

  const addToTeam = (char) => {
    if (team.find(c => c.Character === char.Character)) {
      return alert("Already in team!");
    }

    if (team.length >= 8) {
        alert("Maximum 8 members allowed!");
        return;
    }

    setTeam([...team, char]);
  };

    return (
    <div className="character-scroll">
        {characters.map(char => (
        <div key={char["Serial No"]} className="character-card">
            <h4>{char.Character}</h4>
            <small>
            {char.Anime} • ⭐ {char["Base Rating"]}
            </small>
            <br />
            <small>{char.Alignment}</small>
            <br />
            <button
            className="add-btn"
            onClick={() => addToTeam(char)}
            >
            Add
            </button>
        </div>
        ))}
    </div>
    );
}