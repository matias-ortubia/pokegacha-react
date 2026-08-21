// ---- Shapes que devuelve la PokeAPI ----

export interface PokeApiTypeSlot {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokeApiMoveRef {
    name: string;
    url: string;
}

export interface PokeApiMoveSlot {
    move: PokeApiMoveRef;
}

export interface PokeApiAbilitySlot {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface PokeApiSprites {
    front_default: string | null;
    front_shiny: string | null;
}

export interface PokeApiPokemon {
    id: number;
    name: string;
    types: PokeApiTypeSlot[];
    moves: PokeApiMoveSlot[];
    abilities: PokeApiAbilitySlot[];
    sprites: PokeApiSprites;
    species: {
        url: string;
    };
}

export interface PokeApiSpecies {
    evolution_chain: {
        url: string;
    };
}

export interface EvolutionChainLink {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChainLink[];
}

export interface PokeApiEvolutionChain {
    chain: EvolutionChainLink;
}

// ---- Shapes propios de la app ----

export interface CachedPokemon {
    id: number;
    name: string;
    types: PokeApiTypeSlot[];
    moves: PokeApiMoveRef[];
    abilities: PokeApiAbilitySlot[];
    evolutions: number[] | null;
    preEvolution: number | null;
    evolutionStage: number | null;
    sprites: PokeApiSprites;
}

export interface Pokemon {
    id: number;
    name: string;
    types: PokeApiTypeSlot[];
    moves: PokeApiMoveRef[];
    ability: string;
    img: string | null;
    evolutions: number[] | null;
    preEvolution: number | null;
    evolutionStage: number | null;
    isShiny: boolean;
}

export interface ObtainedPokemon extends Pokemon {
    obtainedAt: string; // ISO date string
}

export type SortOption = "byId" | "byIdDesc" | "byName" | "byNameDesc" | "byType" | "byObtainedDate";

export type PokemonRarity = "common" | "rare" | "superRare";
