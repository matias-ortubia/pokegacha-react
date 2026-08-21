import type { CachedPokemon, Pokemon, PokeApiMoveRef } from "../types/pokemon";


export function getPkmnIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return Number(parts[parts.length - 1]);
}

export function areMovesEqual(movesA: PokeApiMoveRef[], movesB: PokeApiMoveRef[]): boolean {
    if (movesA.length !== movesB.length) return false;

    const namesA = movesA.map((m) => m.name).sort();
    const namesB = movesB.map((m) => m.name).sort();

    return namesA.every((name, index) => name === namesB[index]);
}

export function isPkmnAlreadyObtained(
    alreadyObtainedPkmnList: Pokemon[],
    pkmnId: number,
    moves: PokeApiMoveRef[],
    isShiny: boolean
): boolean {
    return alreadyObtainedPkmnList.some(
        (pkmn) => pkmn.id === pkmnId && pkmn.isShiny === isShiny && areMovesEqual(pkmn.moves, moves)
    );
}

export function toCachedPokemonMoves(cached: CachedPokemon): PokeApiMoveRef[] {
    return cached.moves;
}
