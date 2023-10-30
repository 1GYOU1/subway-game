import React from 'react';
import { useNavigate } from 'react-router-dom';
// image
import correctImg from '../img/scoring1.png';
import levelImg1 from '../img/level1.png';
import retryBtnImg from '../img/retry_btn.png';

const Game = () => {

    let navigate = useNavigate();

/*
    1. 0~4중에 랜덤으로 숫자 노출 - 맨처음에 숫자를 랜덤으로 만들어둘 것 인가, 아니면 한 문제마다 랜덤으로 추가 할 것 인가 ?
    2. api 가져오기 - 맨 처음 한번만 가져오기.
        ㄴ 형식 {[1, 평택], [1, 금정]}
    3. "01호선" 뒤에 "호선" 자르고 parseInt로 앞에 0 지우고 저장, 서울역 예외처리
    4. input에 입력하여 정답이 맞을 경우 setCorrect에 저장해두어 중복 체크 해주기.
    5. 타이머기능 10초
*/
    return (
        <div className='wrap'>
            <div className="quiz_area">
                <div className={`quiz line1`}>
                    <p><span>1호선</span> 역은?</p>
                </div>
                <div className="answr_area">
                    <form id="quiz_submit">
                        <label htmlFor="subwayName">
                            {/* 답안 입력 */}
                            <input id="subwayName" type="text" placeholder="" autoComplete="off"/>
                        </label>
                        <button id="answr_btn" type="submit">제출</button>
                    </form>
                    {/* 타이머 이미지 */}
                    {/* <img id="timer" className="timer" src={`./img/timer_${timer}s.png`} alt="타이머"/> */}
                </div>
                {/* 정답, 오답 팝업 */}
                {/* <img className="scoring" id="scoring" src={correctImg} alt="정답"/> */}
            </div>
            {/* <div className="result">
                <div>
                    <img id="level_img" className="level_img" src={levelImg1} alt="level1"/>
                    <p className="score">
                        <strong><span id="my_score">100</span>점</strong>
                        <span id="result_txt"></span>
                    </p>
                </div>
                <button className="retry_btn">
                    <img className="level_img" src={retryBtnImg} alt="다시하기"/>
                </button>
            </div> */}
        </div>
    );
};

export default Game;