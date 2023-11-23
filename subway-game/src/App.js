import { Routes, Route } from "react-router-dom";
import React from 'react';
// components
import Intro from "./components/Intro";
import Start from "./components/Start";
import Select from "./components/Select";
import Go from "./components/Go";
import Game from "./components/Game";
import Result from "./components/Result";
// css
import './css/style.css';

function App() {
    return (
        <div className="wrap">
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/:nextStageParams" element={<Intro />} />{/* nextStage */}
                <Route path="/start" element={<Start />} />
                <Route path="/select" element={<Select />} />
                <Route path="/go/:params" element={<Go />} />{/* selectedLinesParams & nextStage */}
				<Route path="/game/:params" element={<Game />} />{/* selectedLinesParams & nextStage */}
                <Route path="/result/:params1" element={<Result />} />
                <Route path="/result/:params1/:params2" element={<Result />} />{/* nextStage */}
            </Routes>
        </div>
    );
}

export default App;