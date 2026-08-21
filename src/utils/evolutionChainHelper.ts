import type { EvolutionChainLink } from "../types/pokemon";
import { getPkmnIdFromUrl } from "./pkmnHelper";

const MAX_PKMN_NUMBER = 151; // Por ahora solo soporta Pokemon de la primera gen


export function getPkmnEvolutions(evolutionChain: EvolutionChainLink, pkmnName: string): number[] | null {
    const queue: EvolutionChainLink[] = [evolutionChain];

    while (queue.length > 0) {
        const currentEvolution = queue.shift()!;
        const currentName = currentEvolution.species.name.toLowerCase();

        if (currentName === pkmnName) {
            return resolveEvolutionsIds(currentEvolution.evolves_to);
        }

        if (currentEvolution.evolves_to.length > 0) {
            queue.push(...currentEvolution.evolves_to);
        }
    }

    return null;
}

export function getPkmnPreEvolution(evolutionChain: EvolutionChainLink, pkmnName: string): number | null {
    const queue: { evolution: EvolutionChainLink; parent: EvolutionChainLink | null }[] = [
        { evolution: evolutionChain, parent: null },
    ];

    while (queue.length > 0) {
        const { evolution, parent } = queue.shift()!;
        const currentName = evolution.species.name.toLowerCase();

        if (currentName === pkmnName) {
            return parent ? getPkmnIdFromUrl(parent.species.url) : null;
        }

        for (const nextEvolution of evolution.evolves_to) {
            queue.push({ evolution: nextEvolution, parent: evolution });
        }
    }

    return null;
}

export function getPkmnEvolutionStage(evolutionChain: EvolutionChainLink, pkmnName: string): number | null {
    const queue: { evolution: EvolutionChainLink; stage: number }[] = [{ evolution: evolutionChain, stage: 0 }];

    while (queue.length > 0) {
        const { evolution, stage } = queue.shift()!;
        const currentName = evolution.species.name.toLowerCase();

        if (currentName === pkmnName) {
            return stage;
        }

        for (const nextEvolution of evolution.evolves_to) {
            queue.push({ evolution: nextEvolution, stage: stage + 1 });
        }
    }

    return null;
}

function resolveEvolutionsIds(evolutions: EvolutionChainLink[]): number[] {
    return evolutions
        .map((evolution) => evolution.species.url)
        .map((evolutionUrl) => getPkmnIdFromUrl(evolutionUrl))
        .filter((evolutionId) => evolutionId <= MAX_PKMN_NUMBER);
}
