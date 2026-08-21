import type { CachedPokemon, PokeApiEvolutionChain, PokeApiPokemon, PokeApiSpecies } from "../types/pokemon";
import { getPkmnEvolutions, getPkmnPreEvolution, getPkmnEvolutionStage } from "../utils/evolutionChainHelper";

export const MAX_POKEMON = 151;

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status} for ${url}`);
    }
    return response.json();
}

async function fetchPkmn(id: number): Promise<PokeApiPokemon> {
    return fetchJson<PokeApiPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

async function fetchPkmnSpecies(pkmn: PokeApiPokemon): Promise<PokeApiSpecies> {
    return fetchJson<PokeApiSpecies>(pkmn.species.url);
}

async function fetchPkmnEvolutionChain(species: PokeApiSpecies): Promise<PokeApiEvolutionChain> {
    return fetchJson<PokeApiEvolutionChain>(species.evolution_chain.url);
}

export async function fetchCachedPokemon(id: number): Promise<CachedPokemon> {
    const pkmn = await fetchPkmn(id);
    const species = await fetchPkmnSpecies(pkmn);
    const evolutionChain = await fetchPkmnEvolutionChain(species);

    return {
        id: pkmn.id,
        name: pkmn.name,
        types: pkmn.types,
        moves: pkmn.moves.map((moveSlot) => moveSlot.move),
        abilities: pkmn.abilities,
        evolutions: getPkmnEvolutions(evolutionChain.chain, pkmn.name),
        preEvolution: getPkmnPreEvolution(evolutionChain.chain, pkmn.name),
        evolutionStage: getPkmnEvolutionStage(evolutionChain.chain, pkmn.name),
        sprites: pkmn.sprites,
    };
}
