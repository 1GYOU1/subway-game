import { Routes, Route } from "react-router-dom";
import React from 'react';

import Intro from "./components/Intro";
import Start from "./components/Start";
import Game from "./components/Game";

import './css/style.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/start" element={<Start />} />
				<Route path="/game" element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;