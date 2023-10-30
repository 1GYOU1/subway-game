import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// image
import correctImg from '../img/scoring1.png';
import levelImg1 from '../img/level1.png';
import retryBtnImg from '../img/retry_btn.png';

const Game = () => {

    let navigate = useNavigate();
    
    const [randomLine, setRandomLine] = useState(Math.floor(Math.random() * 4+1))// 랜덤 호선 1~4
    const [inputValue, setInputValue] = useState(''); // input 데이터 입력
    const [myAnswr, setMyAnswr] = useState([]);// 맞은 문제 배열
    const [quizCount, setQuizCount] = useState(0);// 푼 퀴즈 개수
    const [myScore, setMyScore] = useState(0);// 점수
    const [timer, setTimer] = useState(10);// 타이머

    /*
        1. 0~4중에 랜덤으로 숫자 노출 - 한 문제마다 랜덤으로 추가
        2. api 가져오기 - 맨 처음 한번만 가져오기.
            ㄴ 형식 {[1, 평택], [1, 금정]}
        3. 서울역 예외처리
        4. input 입력 텍스트 받아오기

        5. 입력한 값 useState에 넣고 api 요소의 0번째 배열 (호선) 비교해서 맞는지 체크
        6. input에 입력하여 정답이 맞을 경우 setCorrect에 저장해두어 중복 체크 해주기.
        
        7. 정답, 오답 이미지 노출
        8. 10문제만 진행 quizCount++

        9. 타이머기능 10초
        10. useParams 로 결과 값 넘겨주는 방식 해보기 안되면 props로 전달

        --------------------
        11. 힌트 기능
            ㄴ 지하철 노선도 이미지 노출
    */

    //Api
    const [loading, setLoading] = useState(true); // 데이터 로딩
    const [error, setError] = useState(null); // 데이터 로딩 중 오류
    const [stationData, setStationData] = useState([]); // LINE_NUM 및 STATION_NM을 저장할 배열

    useEffect(() => {
        async function fetchData() {
            try {
                const apiUrl = 'http://openapi.seoul.go.kr:8088/4b4948426b316779363375646c5141/json/SearchSTNBySubwayLineInfo/0/400/';
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const stationList = data.SearchSTNBySubwayLineInfo.row;
                // LINE_NUM과 STATION_NM만 추출하여 배열에 저장
                const extractedData = stationList.map(({ LINE_NUM, STATION_NM }) => {
                    // 예외처리
                    if (STATION_NM === "서울역") {
                      STATION_NM = "서울";
                    }
                    return [LINE_NUM, STATION_NM];
                  });
                setStationData(extractedData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    // 정답 입력
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본동작 새로고침 막기
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('내가 입력한 답안:', inputValue);
        }
    };

    const handleInputChange = (event) => {
        // input 값이 변경될 때마다 inputValue 상태를 업데이트
        setInputValue(event.target.value);
    };
    

    // 결과 페이지로 이동
    const goResult = () => {
        navigate('/result');
    }

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }
    
    if (error) {
    return <div className='loading'>Error: {error.message}</div>;
    }

    return (
        <div className="wrap">
            <div className="quiz_area">
                <div className={`quiz line${randomLine}`}>
                    <p><span>{randomLine}호선</span> 역은?</p>
                </div>
                <div className="answer_area">
                    <form id="quiz_submit" onSubmit={handleSubmit}>
                        <label htmlFor="subwayName">
                            {/* 답안 입력 */}
                            <input
                                id="subwayName"
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                value={inputValue}
                                onKeyPress={handleKeyUp}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button id="answer_btn" type="submit">제출</button>
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