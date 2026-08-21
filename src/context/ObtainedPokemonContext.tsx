import { createContext, useContext, type ReactNode } from "react";
import { useObtainedPokemon } from "../hooks/useObtainedPokemon";

type ObtainedPokemonContextValue = ReturnType<typeof useObtainedPokemon>;

const ObtainedPokemonContext = createContext<ObtainedPokemonContextValue | null>(null);

export function ObtainedPokemonProvider({ children }: { children: ReactNode }) {
    const value = useObtainedPokemon();
    return <ObtainedPokemonContext.Provider value={value}>{children}</ObtainedPokemonContext.Provider>;
}

export function useObtainedPokemonContext(): ObtainedPokemonContextValue {
    const context = useContext(ObtainedPokemonContext);
    if (!context) {
        throw new Error("useObtainedPokemonContext debe usarse dentro de <ObtainedPokemonProvider>");
    }
    return context;
}
