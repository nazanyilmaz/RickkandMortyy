import { create } from "zustand";

interface CharacterState {
  selectedCharacters: string[];
  query: string;
  setQuery: (query: string) => void;
  toggleCharacter: (characterName: string) => void;
  removeCharacter: (characterName: string) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacters: [],
  query: "",
  setQuery: (query) => set({ query }),
  toggleCharacter: (characterName) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.includes(characterName)
        ? state.selectedCharacters.filter((name) => name !== characterName)
        : [...state.selectedCharacters, characterName],
    })),
  removeCharacter: (characterName) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (name) => name !== characterName
      ),
    })),
}));
