import { Routes, Route } from "react-router-dom";
import React from 'react';

import Intro from "./components/Intro";
import Start from "./components/Start";
import Game from "./components/Game";
import Result from "./components/Result";

import './css/style.css';

function App() {
    return (
        <div className="wrap">
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/start" element={<Start />} />
				<Route path="/game" element={<Game />} />
                <Route path="/result/:scoreParams" element={<Result />} />
            </Routes>
        </div>
    );
}

export default App;