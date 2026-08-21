import { useMutation } from "@tanstack/react-query";
import { fetchCachedPokemon, MAX_POKEMON } from "../api/pokeapiClient";
import { getPkmnFromLocalStorage, cachePkmn } from "../utils/pkmnCacheHelper";
import type { CachedPokemon, Pokemon, PokeApiMoveRef, PokeApiAbilitySlot } from "../types/pokemon";

const SHINY_CHANCE = 4096;
const MOVES_PER_PULL = 4;

function shuffle<T>(items: T[]): T[] {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function resolveMoves(moves: PokeApiMoveRef[]): PokeApiMoveRef[] {
    return shuffle(moves).slice(0, MOVES_PER_PULL);
}

function resolveAbility(abilities: PokeApiAbilitySlot[]): string {
    const index = Math.floor(Math.random() * abilities.length);
    return abilities[index].ability.name;
}

function buildPokemon(cached: CachedPokemon, isShiny: boolean): Pokemon {
    return {
        id: cached.id,
        name: cached.name,
        types: cached.types,
        moves: resolveMoves(cached.moves),
        ability: resolveAbility(cached.abilities),
        img: isShiny ? cached.sprites.front_shiny : cached.sprites.front_default,
        evolutions: cached.evolutions,
        preEvolution: cached.preEvolution,
        evolutionStage: cached.evolutionStage,
        isShiny,
    };
}

async function getOrFetchCachedPokemon(id: number): Promise<CachedPokemon> {
    const cached = getPkmnFromLocalStorage(id);
    if (cached) return cached;

    const fetched = await fetchCachedPokemon(id);
    cachePkmn(fetched);
    return fetched;
}

export function usePokemonPull() {
    async function pullOne(): Promise<Pokemon> {
        const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
        const isShiny = Math.floor(Math.random() * SHINY_CHANCE) === 0;

        const cached = await getOrFetchCachedPokemon(randomId);

        return buildPokemon(cached, isShiny);
    }

    const singlePull = useMutation({ mutationFn: pullOne });

    const multiPull = useMutation({
        mutationFn: async () => {
            const pulls: Pokemon[] = [];
            for (let i = 0; i < 10; i++) {
                pulls.push(await pullOne());
            }
            return pulls;
        },
    });

    return { singlePull, multiPull };
}
