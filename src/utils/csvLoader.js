import Papa from "papaparse";

export function loadCharacters(setCharacters) {
  Papa.parse("/Anime_Roster.csv", {
    download: true,
    header: true,
    complete: (result) => {
      setCharacters(result.data.filter(r => r.Character));
    }
  });
}