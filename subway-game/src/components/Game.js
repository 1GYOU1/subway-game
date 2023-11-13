import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// image
import submitBtnImg from '../img/btn_submit.png';
import clickImg from '../img/click.png';
import correctImg from '../img/scoring1.png';
import wrongImg from '../img/scoring2.png';
import duplicateImg from '../img/scoring3.png';
import levelImg1 from '../img/level1.png';
import retryBtnImg from '../img/retry_btn.png';

const Game = () => {

    let navigate = useNavigate();

    let clickRef = useRef();
    
    const [randomLine, setRandomLine] = useState(Math.floor(Math.random() * 4+1))// 랜덤 호선 1~4
    const [inputValue, setInputValue] = useState(''); // input 데이터 입력
    const [myAnswr, setMyAnswr] = useState([]);// 맞은 문제 배열
    const [quizResult, setQuizResult] = useState(null);// 정답, 오답, 중복 이미지 노출
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
        5. 제출한 입력값이 api 요소의 호선(0번째 배열 요소값), 역 이름(1번째 배열 요소값)이 비교
            ㄴ 맞으면 원본배열에서 삭제, 내 맞춘 답안 정답 배열 setCorrect에 넣기
            ㄴ 같은 역이름을 가진 다른 호선 배열 값도 삭제(중복 체크), 내 맞춘 답안 정답 배열 setCorrect에 넣기
            ㄴ 이미 정답 배열에 있는 값이라면 중복 이미지 노출 
        6. 정답, 오답, 중복 이미지 노출

        7. 10문제 진행 quizCount++
        8. 타이머기능 10초
        9. 결과 값 props로 전달

        --------------------
        10. 힌트 기능
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
        console.log('quizResult', quizResult)
    }, [stationData, myAnswr, quizResult])

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

    //정답 제출
    const answerCheck = () => {
        if (inputValue.trim() === '') {
            // 입력값이 비어있을 때 동작하지 않도록 처리
            return;
        }

        console.log('내가 입력한 답안:', inputValue);

        // 이미 setMyAnswr에 같은 값이 있는지 확인 (중복 선별)
        if (myAnswr.some(item => item[0] === randomLine && item[1] === inputValue)) {
            alert('이미 입력한 답안입니다. 다른 답안을 입력해주세요.');
            // 중복 이미지 노출
            setQuizResult('duplicate');
            quizResultEvent(); // 정답 이미지 노출
            setTimeout(() => { // 이미지 노출 초기화
                setQuizResult(null);
            }, 1500);
            setInputValue(''); // input 초기화
            return;
        }
    
        // 호선, 역 이름이 모두 일치하는 배열의 index 찾기
        const foundIndex = stationData.findIndex(item => item[0] === randomLine && item[1] === inputValue);

        if (foundIndex !== -1) {
            setStationData(prevStationData => {
                const filteredData = prevStationData.filter(item => item[1] !== inputValue);// 원본 배열에서 역 이름이 일치하는 항목 모두 제거
                const excludedItems = prevStationData.filter(item => item[1] === inputValue);// 원본 배열에서 역 이름이 일치하는 항목 중복 답안 제출 방지를 위해 모두 setMyAnswr에 추가
                setMyAnswr(prevAnswr => [...prevAnswr, ...excludedItems]);
                
                alert('야호 정답 ~ !')
                setQuizResult('correct');
                quizResultEvent(); // 정답 이미지 노출
                setTimeout(() => {
                    setQuizResult(null);
                    setRandomLine(Math.floor(Math.random() * 4+1));//랜덤 호선 새로 돌리기 (다음 문제 시작)
                }, 1500);

                return filteredData;// 새로운 배열로 업데이트
            });
            console.log('일치하는 항목의 랜덤호선:', randomLine);
        } else {
            alert('틀렸지롱 ~ !')
            // 오답 이미지 노출
            setQuizResult('wrong');
            quizResultEvent(); // 정답 이미지 노출
            setTimeout(() => {
                setQuizResult(null);
            }, 1500);
        }
        
        clickRef.current.classList.remove('on');
        setInputValue(''); // input 초기화
    }

    // 정답 제출 - 엔터키
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();// 기본 동작(페이지 새로고침) 방지
            answerCheck();
        };
    };
    
    // 정답 제출 - 버튼 클릭
    const buttonClick = () => {
        answerCheck();
    };

    // 정답, 오답, 중복 이미지 노출
    const quizResultEvent = () => {
        if(quizResult === 'correct'){
            console.log('correct')
            return (
                <>
                    <img className='scoring' src={correctImg} alt="정답"/>
                </>
            )
        }else if(quizResult === 'wrong'){
            console.log('wrong')
            return (
                <>
                    <img className='scoring' src={wrongImg} alt="오답"/>
                </>
            )
        }else if(quizResult === 'duplicate'){
            console.log('duplicate')
            return (
                <>
                    <img className='scoring' src={duplicateImg} alt="중복"/>
                </>
            )
        }else{
            return null;
        }
    }
    
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
                {/* 정답, 오답, 중복 이미지 */}
                {quizResultEvent()}
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