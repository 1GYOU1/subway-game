import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// image
import miceImg from '../img/mice.png';
import titImg from '../img/tit.png';
import num1Img from '../img/num1.png';
import num2Img from '../img/num2.png';
import num3Img from '../img/num3.png';
import num4Img from '../img/num4.png';
import subwayImg from '../img/subway.jpg';
import startBtnImg from '../img/btn_start.png';
import HowToBtnImg from '../img/btn_howto.png';

const Start = () => {

    let navigate = useNavigate();
    let popRef = useRef();

    const goGame = () => {
        setTimeout(() => {
            navigate('/game');
        }, 1200);
    }
    const popOpen = () => {
        popRef.current.style.display = "block";
    }
    const popClose = () => {
        popRef.current.style.display = "none";
    }

    return (
        <div className='wrap'>
            <div className="start_area">
                <div className='top_area'>
                    <h1><img src={titImg} alt="제목"/></h1>
                    <ul className="number_wrap">
                        <li><img src={num1Img} alt="1"/></li>
                        <li><img src={num2Img} alt="2"/></li>
                        <li><img src={num3Img} alt="3"/></li>
                        <li><img src={num4Img} alt="4"/></li>
                    </ul>
                </div>

                <div className="subway_wrap">
                    <ul className="subway">
                        <li><img src={subwayImg} alt="지하철"/></li>
                        <li><img src={subwayImg} alt="지하철"/></li>
                        <li><img src={subwayImg} alt="지하철"/></li>
                        <li><img src={subwayImg} alt="지하철"/></li>
                    </ul>
                </div>

                <ul className="btn_wrap">
                    <li>
                        <button onClick={goGame}>
                            <img className="btn" src={startBtnImg} alt="시작버튼"/>
                        </button>
                        <img className="mice" src={miceImg} alt="시골쥐"/>
                    </li>
                    <li>
                        <button onClick={popOpen}>
                            <img className="btn" src={HowToBtnImg} alt="게임방법"/>
                        </button>
                        <img className="mice" src={miceImg} alt="시골쥐"/>
                    </li>
                </ul>
            </div>
            <div className="popup" ref={popRef}>
                <div className="bg" onClick={popClose}></div>
                <div className="cont">
                    <span className="close" onClick={popClose}></span>
                    <p>
                        랜덤으로 나오는 지하철 호선에
                        <br/>정답을 입력해 주세요~
                        <br/>중복으로 정답 입력시 오답처리됩니다.
                        <br/>한 문제당 10초안에 풀어주세요
                        <br/>
                        <br/><span>*'역'을 제외하고 입력해주세요
                        <br/>예: 강남역 → 강남</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Start;