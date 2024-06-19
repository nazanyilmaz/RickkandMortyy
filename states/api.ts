import { BASE_URL } from "./url";

export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

export const fetchCharacters = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/character/?name=${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error; // Hata yeniden fırlatılıyor
  }
};
