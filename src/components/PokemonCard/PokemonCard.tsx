import type { Pokemon } from "../../types/pokemon";
import { formatNameWithDash, capitalize } from "../../utils/formatHelper";
import { getColorByType } from "../../utils/typeColors";
import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
    pkmn: Pokemon;
}

export function PokemonCard({ pkmn }: PokemonCardProps) {
    const backgroundColor = getColorByType(pkmn.types[0].type.name);

    return (
        <div className={styles.pkmnContainer} style={{ backgroundColor }}>
            <h5 className={`${styles.pkmnName} ${pkmn.isShiny ? styles.shinyName : ""}`}>
                {capitalize(pkmn.name)}
                {pkmn.isShiny ? " ✮" : ""}
            </h5>

            {pkmn.img && <img className={styles.pkmnImg} src={pkmn.img} alt={pkmn.name} />}

            <div className={styles.abilityContainer}>
                <p className={styles.abilityName}>{formatNameWithDash(pkmn.ability)}</p>
            </div>

            <ul className={styles.movesContainer}>
                {pkmn.moves.map((move) => (
                    <li key={move.name} className={styles.pkmnMove}>
                        {move?.name != null ? formatNameWithDash(move.name) : " "}
                    </li>
                ))}
            </ul>
        </div>
    );
}