import React from 'react';
// image
import miceImg from '../img/mice.png';
import dungImg from '../img/dungdung.png';
import { useNavigate } from 'react-router-dom';

const Intro = () => {

    let navigate = useNavigate();

    setTimeout(() => {
        navigate('/start');
    }, 4000);
    
    return (
        <div className='wrap'>
            <div className="loading">
                <div className="character_area">
                    <img className="mice" src={miceImg} alt="시골 쥐"/>
                    <img className="dungdung" src={dungImg} alt="말풍선"/>
                </div>
            </div>
        </div>
    );
};

export default Intro;