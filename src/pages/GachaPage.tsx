import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";
import { usePokemonPull } from "../hooks/usePokemonPull";
import { useObtainedPokemonContext } from "../context/ObtainedPokemonContext";
import { PokemonList } from "../components/PokemonList/PokemonList";
import { PokemonCarousel } from "../components/PokemonCarousel/PokemonCarousel";

const MOBILE_BREAKPOINT = 1024;

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}

export function GachaPage() {
    const [lastPull, setLastPull] = useState<Pokemon[]>([]);
    const { singlePull, multiPull } = usePokemonPull();
    const { addPokemon, addPokemonList } = useObtainedPokemonContext();
    const isMobile = useIsMobile();

    const isPulling = singlePull.isPending || multiPull.isPending;

    const handleSinglePull = () => {
        singlePull.mutate(undefined, {
            onSuccess: (pkmn) => {
                setLastPull([pkmn]);
                addPokemon(pkmn);
            },
        });
    };

    const handleMultiPull = () => {
        multiPull.mutate(undefined, {
            onSuccess: (pkmnList) => {
                setLastPull(pkmnList);
                addPokemonList(pkmnList);
            },
        });
    };

    return (
        <main>
            <div className="gachaView">
                <div className="gachaButtonsContainer">
                    <button className="button pull" onClick={handleSinglePull} disabled={isPulling}>
                        x1 pull
                    </button>
                    <button className="button pull" onClick={handleMultiPull} disabled={isPulling}>
                        x10 pull
                    </button>
                </div>

                {isPulling && <p className="pullStatus">Catching Pokémon...</p>}

                {(singlePull.isError || multiPull.isError) && (
                    <p className="pullStatus pullError">
                        Something went wrong. Please, try again later.
                    </p>
                )}

                {!isPulling && lastPull.length > 0 && (
                    isMobile && lastPull.length > 1
                        ? <PokemonCarousel pkmnList={lastPull} />
                        : <PokemonList pkmnList={lastPull} />
                )}
            </div>
        </main>
    );
}
