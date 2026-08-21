import type { CachedPokemon } from "../types/pokemon";

export const CACHE_KEY_PREFIX = "cachedPkmn_";

export function getPkmnFromLocalStorage(pkmnId: number): CachedPokemon | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY_PREFIX + pkmnId);
        return raw ? (JSON.parse(raw) as CachedPokemon) : null;
    } catch (error) {
        console.error(`No se pudo leer del cache el Pokémon ${pkmnId}:`, error);
        return null;
    }
}

export function cachePkmn(pkmn: CachedPokemon): void {
    try {
        localStorage.setItem(CACHE_KEY_PREFIX + pkmn.id, JSON.stringify(pkmn));
    } catch (error) {
        console.error(`No se pudo cachear el Pokémon ${pkmn.id}:`, error);
    }
}
