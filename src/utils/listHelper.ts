import type { ObtainedPokemon } from "../types/pokemon";

const TYPE_ORDER = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

export function sortById(pkmnList: ObtainedPokemon[], reversed = false): ObtainedPokemon[] {
    const cmp = reversed ? (a: ObtainedPokemon, b: ObtainedPokemon) => b.id - a.id
                         : (a: ObtainedPokemon, b: ObtainedPokemon) => a.id - b.id;
    return [...pkmnList].sort(cmp);
}

export function sortByName(pkmnList: ObtainedPokemon[], reversed = false): ObtainedPokemon[] {
    const cmp = reversed
        ? (a: ObtainedPokemon, b: ObtainedPokemon) => b.name.localeCompare(a.name)
        : (a: ObtainedPokemon, b: ObtainedPokemon) => a.name.localeCompare(b.name);
    return [...pkmnList].sort(cmp);
}

export function sortByType(pkmnList: ObtainedPokemon[]): ObtainedPokemon[] {
    const cmpByType = (a: ObtainedPokemon, b: ObtainedPokemon) => {
        const aIndex = TYPE_ORDER.indexOf(a.types[0].type.name);
        const bIndex = TYPE_ORDER.indexOf(b.types[0].type.name);

        // Si no está en la lista, lo mandamos al final
        const aRank = aIndex === -1 ? TYPE_ORDER.length : aIndex;
        const bRank = bIndex === -1 ? TYPE_ORDER.length : bIndex;

        return aRank - bRank;
    };

    return [...pkmnList].sort(cmpByType);
}

export function sortByObtainedDate(pkmnList: ObtainedPokemon[], reversed = false): ObtainedPokemon[] {
    const cmp = reversed
        ? (a: ObtainedPokemon, b: ObtainedPokemon) => new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime()
        : (a: ObtainedPokemon, b: ObtainedPokemon) => new Date(a.obtainedAt).getTime() - new Date(b.obtainedAt).getTime();
    return [...pkmnList].sort(cmp);
}
