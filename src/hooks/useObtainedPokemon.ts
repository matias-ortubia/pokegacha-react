import { useCallback, useEffect, useState } from "react";
import type { ObtainedPokemon, Pokemon } from "../types/pokemon";

const STORAGE_KEY = "obtainedPkmnList";

function loadFromStorage(): ObtainedPokemon[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ObtainedPokemon[]) : [];
    } catch (error) {
        console.error("No se pudo leer la colección guardada:", error);
        return [];
    }
}

export function useObtainedPokemon() {
    const [obtainedPkmnList, setObtainedPkmnList] = useState<ObtainedPokemon[]>(loadFromStorage);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obtainedPkmnList));
    }, [obtainedPkmnList]);

    const addPokemon = useCallback((pkmn: Pokemon) => {
        const obtained: ObtainedPokemon = { ...pkmn, obtainedAt: new Date().toISOString() };
        setObtainedPkmnList((prev) => [...prev, obtained]);
    }, []);

    const addPokemonList = useCallback((pkmnList: Pokemon[]) => {
        const obtainedAt = new Date().toISOString();
        const obtained: ObtainedPokemon[] = pkmnList.map((pkmn) => ({ ...pkmn, obtainedAt }));
        setObtainedPkmnList((prev) => [...prev, ...obtained]);
    }, []);

    return { obtainedPkmnList, addPokemon, addPokemonList };
}
