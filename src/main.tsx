import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./queryClient/queryClient";
import { ObtainedPokemonProvider } from "./context/ObtainedPokemonContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ObtainedPokemonProvider>
                    <App />
                </ObtainedPokemonProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
