const HIDDEN_CATEGORY = "Strategist";
const HIDDEN_MULTIPLIER = 1.5;

const SAME_ANIME_BONUS = 3;
const SAME_CREW_BONUS = 5;

function getRoleMultiplier(character, assignedRole) {

  if (character["x6 (Best)"] === assignedRole) return 6;
  if (character["x5 (Very High)"] === assignedRole) return 5;
  if (character["x4 (High)"] === assignedRole) return 4;
  if (character["x3 (Mid)"] === assignedRole) return 3;
  if (character["x2 (Low)"] === assignedRole) return 2;
  if (character["x1 (Worst)"] === assignedRole) return 1;

  return 1; // fallback safety
}

export function calculateScore(team, assignments) {

  let totalScore = 0;

  // 🔥 1️⃣ Role Multiplier Scoring
  team.forEach(char => {

    const assignedRole = assignments[char.Character];

    const multiplier = getRoleMultiplier(char, assignedRole);

    let characterScore =
      Number(char["Base Rating"]) * multiplier;

    // Hidden multiplier
    if (assignedRole === HIDDEN_CATEGORY) {
      characterScore *= HIDDEN_MULTIPLIER;
    }

    totalScore += characterScore;
  });

  // 🔥 2️⃣ Chemistry System
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {

      // Same Anime
      if (team[i].Anime === team[j].Anime) {
        totalScore += SAME_ANIME_BONUS;
      }

      // Same Crew (if column exists)
      if (
        team[i].Crew &&
        team[j].Crew &&
        team[i].Crew === team[j].Crew
      ) {
        totalScore += SAME_CREW_BONUS;
      }
    }
  }

  return Math.round(totalScore);
}