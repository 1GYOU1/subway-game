import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// image
import miceImg from '../img/mice.png';
import dungImg from '../img/dungdung.png';
// Nextstage image
import seoulMice from '../img/level3.png';
import dungImg2 from '../img/dungdung2.png';

const Intro = () => {

    let navigate = useNavigate();
    const { nextStageParams } = useParams();// 전달 받은 params === 'nextStage'

    useEffect(() => {
        console.log(nextStageParams)
        if (nextStageParams === 'nextStage') {// nextStageParams가 'nextStage'일 때
            const timeoutId = setTimeout(() => {
                navigate(`/go/${nextStageParams}`);
            }, 4000);
            return () => clearTimeout(timeoutId);

        } else {
            const timeoutId = setTimeout(() => {
                navigate('/start');
            }, 4000);
            return () => clearTimeout(timeoutId);
        }
    }, [nextStageParams, navigate]);
    
    return (
        <>
            {nextStageParams === 'nextStage' ? (
                // nextStage intro
                <div className='next_intro'>
                    <div className="character_area">
                        <img className="seoul_mice" src={seoulMice} alt="서울 쥐"/>
                        <img className="dungdung" src={dungImg2} alt="말풍선"/>
                    </div>
                </div>
            ) : (
                <div className="intro">
                    <div className="character_area">
                        <img className="mice" src={miceImg} alt="시골 쥐"/>
                        <img className="dungdung" src={dungImg} alt="말풍선"/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Intro;