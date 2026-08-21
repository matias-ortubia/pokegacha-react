import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { GachaPage } from "./pages/GachaPage";
import { ObtainedPage } from "./pages/ObtainedPage";

function App() {
    return (
        <>
            <header>
                <h1 className="title">PokeGacha</h1>
            </header>
            <div id="appContainer">
                <Navbar />
                <Routes>
                    <Route path="/" element={<GachaPage />} />
                    <Route path="/obtained" element={<ObtainedPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
