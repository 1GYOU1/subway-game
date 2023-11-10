import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// image
import submitBtnImg from '../img/btn_submit.png';
import clickImg from '../img/click.png';
import correctImg from '../img/scoring1.png';
import levelImg1 from '../img/level1.png';
import retryBtnImg from '../img/retry_btn.png';

const Game = () => {

    let navigate = useNavigate();

    let clickRef = useRef();
    
    const [randomLine, setRandomLine] = useState(Math.floor(Math.random() * 4+1))// 랜덤 호선 1~4
    const [inputValue, setInputValue] = useState(''); // input 데이터 입력
    const [myAnswr, setMyAnswr] = useState([]);// 맞은 문제 배열
    const [quizCount, setQuizCount] = useState(0);// 푼 퀴즈 개수
    const [myScore, setMyScore] = useState(0);// 점수
    const [timer, setTimer] = useState(10);// 타이머

    /*
        1. 0~4중에 랜덤으로 숫자 노출 - 한 문제마다 랜덤 돌리기
        2. api 맨 처음 한번만 가져오기. ex - {['01호선', '평택역']}
            ㄴ 필요한 형태로 가져오기{{ LINE_NUM, STATION_NM }, [1, 평택], [1, 금정]}
            ㄴ 서울역 예외처리-=98
        3. input 입력 텍스트 받아오기
            ㄴ입력한 값 useState에 넣고(inputValue) 특수문자, 영어, 숫자 입력 제한
        4. input에 답안 입력 후 엔터키, 클릭 시 제출


        5. 제출한 입력값이 api 요소의 호선(0번째 배열 요소값), 역 이름(1번째 배열 요소값)이 비교해서 맞으면 배열에 저장
        6. input에 입력하여 정답이 맞을 경우 setCorrect에 저장해두기 
        7. 맞은 답안이 api에 또 있으면 중복 체크 해주기.
        8. 정답, 오답 구분
        9. 정답, 오답 이미지 노출
        10. 10문제 진행 quizCount++
        11. 타이머기능 10초
        11. useParams 로 결과 값 넘겨주는 방식 해보기 안되면 props로 전달

        --------------------
        12. 힌트 기능
            ㄴ 지하철 노선도 이미지 노출 ?
    */

    //Api
    const [loading, setLoading] = useState(true); // 데이터 로딩
    const [error, setError] = useState(null); // 데이터 로딩 중 오류
    const [stationData, setStationData] = useState([]); // LINE_NUM 및 STATION_NM을 저장할 배열

    useEffect(() => {
        async function fetchData() {
            try {
                const apiUrl = `${process.env.REACT_APP_API}`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const stationList = data.DATA.map((item) => {
                    return {
                        LINE_NUM: item.line_num,
                        STATION_NM: item.station_nm,
                    };
                });
                // LINE_NUM과 STATION_NM만 추출하여 배열에 저장
                const extractedData = stationList
                    .filter(({ LINE_NUM }) => !isNaN(parseInt(LINE_NUM))) // 숫자가 아닌 경우 필터링
                    .map(({ LINE_NUM, STATION_NM }) => {
                        LINE_NUM = parseInt(LINE_NUM.replace("호선", "").trim());
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
        console.log(stationData)
    }, []);

    useEffect(() => {
        console.log(stationData)
        console.log('myAnswr',myAnswr);
    }, [stationData, myAnswr])

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }
    
    if (error) {
    return <div className='loading'>Error: {error.message}</div>;
    }

    // 정답 입력
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본동작 새로고침 막기
    };

    const handleInputChange = (event) => {
        // 영어, 숫자, 특수문자, 스페이스바(공백) 입력 방지
        const englishRegExp = /[A-Za-z]/;
        const numberRegExp = /\d/;
        const specialCharRegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&'"\(\)=]/;
        const spaceRegExp = /\s/;
    
        if (englishRegExp.test(event.target.value)) {
            alert('영어는 입력할 수 없습니다.');
            return;
        }
        if (numberRegExp.test(event.target.value)) {
            alert('숫자는 입력할 수 없습니다.');
            return;
        }
        if (specialCharRegExp.test(event.target.value)) {
            alert('특수문자는 입력할 수 없습니다.');
            return;
        }
        if (spaceRegExp.test(event.target.value)) {
            alert('스페이스바(공백)는 입력할 수 없습니다.');
            return;
        }

        // 입력값에서 영어, 특수문자, 스페이스바(공백)를 제외한 값을 추출
        const lastSubmitValue = event.target.value
            .replace(englishRegExp, '')
            .replace(numberRegExp, '')
            .replace(specialCharRegExp, '')
            .replace(spaceRegExp, '')
            .trim();

        //제출하기 클릭 애니메이션 노출
        if(lastSubmitValue.length > 0){
            clickRef.current.classList.add('on');
        }else{
            clickRef.current.classList.remove('on');
        }
        // input 값이 변경될 때마다 inputValue 상태를 업데이트
        setInputValue(lastSubmitValue);
    };
    
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();// 기본 동작(페이지 새로고침) 방지

            console.log('내가 입력한 답안:', inputValue);
    
            // 역 이름이 일치하는 인덱스 찾기
            const foundIndex = stationData.findIndex(item => item[1] === inputValue);
            
            // 정답을 찾았을 때
            if (foundIndex !== -1) {
                // 역 이름이 일치하는 항목을 찾아서 제외하고 새로운 배열로 설정
                setStationData(prevStationData => {
                    // 역 이름이 일치하지 않는 항목만 추려서 새로운 배열로 만듦
                    const filteredData = prevStationData.filter(item => item[1] !== inputValue);
                    
                     // 중복 항목 제외하고 setMyAnswr에 추가
                    const excludedItems = prevStationData.filter(item => item[1] === inputValue);
                    setMyAnswr(prevAnswr => [...prevAnswr, ...excludedItems]);
                    
                    alert('야호 정답 ~ !')
                    console.log('정답 !');
                    
                    setRandomLine(Math.floor(Math.random() * 4+1));//랜덤 호선 새로 돌리기 

                    return filteredData;// 새로운 배열로 업데이트
                });
                console.log('일치하는 항목의 랜덤호선:', randomLine);
            } else {
                alert('틀렸지롱 ~ !')
                console.log('일치하는 항목을 찾지 못했습니다.');
            }
            
            clickRef.current.classList.remove('on');
            setInputValue(''); // input 초기화
        }
    };
    
    
    //버튼 클릭 정답 제출
    const buttonClick = () => {
        console.log('내가 입력한 답안:', inputValue);
        clickRef.current.classList.remove('on');
        setInputValue(''); // input 초기화
    };
    
    // 결과 페이지로 이동
    const goResult = () => {
        navigate('/result');
    }

    return (
        <div className="wrap">
            <div className="quiz_area">
                <div className={`quiz line${randomLine}`}>
                    <p><span>{randomLine}호선</span><br/> 역 이름은?</p>
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
                    </form>
                    <button id="answer_btn" type="submit" onClick={buttonClick}>
                        <img ref={clickRef} className='click' src={clickImg} alt="클릭"/>
                        <img src={submitBtnImg} alt="정답 제출하기"/>
                    </button>
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