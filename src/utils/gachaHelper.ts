import type { PokemonRarity } from "../types/pokemon";

const RARE_PKMN = [147];
const S_RARE_PKMN = [144, 145, 146, 150, 151];

export function getRarity(pkmnId: number): PokemonRarity {
    if (S_RARE_PKMN.includes(pkmnId)) return "superRare";
    if (RARE_PKMN.includes(pkmnId)) return "rare";
    return "common";
}
