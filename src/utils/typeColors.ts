const POKEMON_COLOR_BY_TYPE: Record<string, string> = {
    BUG: "#88950c",
    DARK: "#3a2c21",
    DRAGON: "#755ddf",
    ELECTRIC: "#e79306",
    FAIRY: "#de8fe0",
    FIGHTING: "#5e2414",
    FIRE: "#cb2501",
    FLYING: "#5d73d6",
    GHOST: "#444593",
    GRASS: "#379b00",
    GROUND: "#cfb054",
    ICE: "#6dd2f4",
    NORMAL: "#c3bfb6",
    POISON: "#8c428d",
    PSYCHIC: "#dc3164",
    ROCK: "#9c873d",
    STEEL: "#8f8e9f",
    WATER: "#0d67c0",
};

export function getColorByType(type: string): string {
    return POKEMON_COLOR_BY_TYPE[type.toUpperCase()] ?? "#999999";
}
