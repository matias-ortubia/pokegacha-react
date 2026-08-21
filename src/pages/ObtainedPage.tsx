import { useMemo, useState } from "react";
import type { ObtainedPokemon, SortOption } from "../types/pokemon";
import { useObtainedPokemonContext } from "../context/ObtainedPokemonContext";
import { SortControls } from "../components/SortControls/SortControls";
import { PokemonList } from "../components/PokemonList/PokemonList";
import { sortById, sortByName, sortByType, sortByObtainedDate } from "../utils/listHelper";

function applySort(list: ObtainedPokemon[], sortOption: SortOption | null): ObtainedPokemon[] {
    switch (sortOption) {
        case "byId": return sortById(list);
        case "byIdDesc": return sortById(list, true);
        case "byName": return sortByName(list);
        case "byNameDesc": return sortByName(list, true);
        case "byType": return sortByType(list);
        case "byObtainedDate": return sortByObtainedDate(list);
        default: return list;
    }
}

export function ObtainedPage() {
    const { obtainedPkmnList } = useObtainedPokemonContext();
    const [sortOption, setSortOption] = useState<SortOption | null>(null);

    const sortedList = useMemo(() => applySort(obtainedPkmnList, sortOption), [obtainedPkmnList, sortOption]);

    return (
        <main>
            <SortControls onSortChange={setSortOption} />
            {sortedList.length === 0 ? (
                <p className="emptyState">You still haven't catched any pokemon. Go to the <span>Catch</span> section to get some!</p>
            ) : (
                <PokemonList pkmnList={sortedList} />
            )}
        </main>
    );
}
