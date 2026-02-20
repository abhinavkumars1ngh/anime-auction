export function validateTeam(team) {

  if (team.length < 6 || team.length > 8) {
    return "Team must have 6–8 characters.";
  }

  const heroes = team.filter(c => c.Alignment === "Hero").length;
  const villains = team.filter(c => c.Alignment === "Villain").length;
  const females = team.filter(c => c.Gender === "F").length;

  if (heroes < 4) return "Minimum 4 Heroes required.";
  if (villains < 2) return "Minimum 2 Villains required.";
  if (females < 2) return "Minimum 2 Female characters required.";

  return null;
}