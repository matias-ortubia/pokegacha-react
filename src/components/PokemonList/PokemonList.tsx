import type { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import styles from "./PokemonList.module.css";

interface PokemonListProps {
    pkmnList: Pokemon[];
}

export function PokemonList({ pkmnList }: PokemonListProps) {
    return (
        <div className={styles.pkmnListContainer}>
            {pkmnList.map((pkmn, index) => (
                <PokemonCard key={`${pkmn.id}-${index}`} pkmn={pkmn} />
            ))}
        </div>
    );
}
