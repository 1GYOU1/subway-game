import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// image
import miceImg from '../img/mice.png';
import submitBtnImg from '../img/btn_submit.png';
import clickImg from '../img/click.png';
import correctImg from '../img/scoring1.png';
import wrongImg from '../img/scoring2.png';
import duplicateImg from '../img/scoring3.png';

const Game = () => {

    let navigate = useNavigate();

    let clickRef = useRef();
    let inputRef = useRef();
    
    const [inputValue, setInputValue] = useState(''); // input 데이터 입력
    const [myAnswr, setMyAnswr] = useState([]);// 맞은 문제 배열
    const [quizResult, setQuizResult] = useState(null);// 정답, 오답, 중복 이미지 노출
    const [quizCount, setQuizCount] = useState(1);// 퀴즈 타이틀
    const [timer, setTimer] = useState(10);// 타이머
    const [myScore, setMyScore] = useState(0);// 맞은 갯수(점수)
    

    /*
        1. 0~4중에 랜덤으로 숫자 노출 - 한 문제마다 랜덤 돌리기
        2. api 맨 처음 한번만 가져오기. ex - {['01호선', '평택역']}
            ㄴ 필요한 형태로 가져오기{{ LINE_NUM, STATION_NM }, [1, 평택], [1, 금정]}
            ㄴ 서울역 예외처리-=98
        3. input 입력 텍스트 받아오기
            ㄴ입력한 값 useState에 넣고(inputValue) 특수문자, 영어, 숫자 입력 제한
        4. input에 답안 입력 후 엔터키, 클릭 시 제출
            ㄴ 자동 input focus
        5. 제출한 입력값이 api 요소의 호선(0번째 배열 요소값), 역 이름(1번째 배열 요소값)이 비교
            ㄴ 맞으면 원본배열에서 삭제, 내 맞춘 답안 정답 배열 setCorrect에 넣기
            ㄴ 같은 역이름을 가진 다른 호선 배열 값도 삭제(중복 체크), 내 맞춘 답안 정답 배열 setCorrect에 넣기
            ㄴ 이미 정답 배열에 있는 값이라면 중복 이미지 노출 
        6. 정답, 오답, 중복 이미지 노출
            ㄴ 정답, 오답, 중복이면 다음 문제 노출
            ㄴ 정답이면 quizCount++ (퀴즈 타이틀 숫자 + 1)
            ㄴ 정답이면 myScore 점수 올리기 (한 문제당 + 10)
        7. 최대 10문제 진행 quizCount++
        8. 타이머기능 10초 -> 10초 지나면 게임 오버. (결과 페이지로)
        9. 새로 고침 방지
        10. 결과 값 params로 전달
        11. 결과 페이지 노출 (상, 중, 하)

        --------------------
        12. 체크박스로 노선 선택해서 선택한 노선만 랜덤 호출 (옵션은 1, 2, 3, 4호선)
        13. 힌트 기능
            ㄴ 지하철 노선도 이미지 노출 ?
        14. hidden stage
            ㄴ 움직이는 쥐 클릭 시 히든 게임 시작
            ㄴ 색 반전, 빠른 시간안에 ..문제 맞추면 ... ?
    */

    //select -> game으로 호선 전달
    const { selectedLinesParams } = useParams();// Select 컴포넌트에서 선택한 호선 전달 값
    const [selectedLines, setSelectedLines] = useState()// 전달 받은 호선 배열 형태로 저장

    const [randomLine, setRandomLine] = useState()// 랜덤 호선 1~4 (selectedLines -> 저장)
    
    //Api
    const [loading, setLoading] = useState(true); // 데이터 로딩
    const [error, setError] = useState(null); // 데이터 로딩 중 오류
    const [stationData, setStationData] = useState([]); // LINE_NUM 및 STATION_NM을 저장할 배열

    useEffect(() => {
        // select 컴포넌트에서 전달 받은 호선 정보 배열로 담기
        if (selectedLinesParams) {
            const linesArray = selectedLinesParams.split(',');
            setSelectedLines(linesArray);
            // console.log('linesArray', linesArray); // [1, 2, 3, 4] 형태
            const randomIndex = Math.floor(Math.random() * linesArray.length);
            setRandomLine(linesArray[randomIndex]);
            // console.log('randomLine', linesArray[randomIndex]);
          }
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

    // 변수 확인
    // useEffect(() => {
    //     console.log(stationData)
    //     console.log('myAnswr',myAnswr);
    //     console.log('quizResult', quizResult)
    //     console.log('quizCount', quizCount)
    //     console.log('myScore', myScore)
    // }, [stationData, myAnswr, quizResult, myScore, quizCount])

    useEffect(() => {
        console.log(randomLine)
    }, [randomLine])

    // 10문제 풀고 결과페이지 랜딩, input focus
    useEffect(() => {
        if(quizCount > 10){
            goResult();
        }
        if(inputRef.current && quizCount >= 0){
            inputRef.current.focus();
        }   
    }, [quizCount])

    // 타이머 기능
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }) 

    // 새로고침 방지
    const preventClose = (e) => {
        e.preventDefault();  
        e.returnValue = ""; 
    }; 
    useEffect(() => {  
        (() => {
        window.addEventListener("beforeunload", preventClose);  
        })();   

        return () => {    
        window.removeEventListener("beforeunload", preventClose);  
    };}, []);

    // 모바일 웹 100vh 스크롤 생기는 현상 수정 (참고 - https://jmjmjm.tistory.com/126)
    useEffect(() => {
        const handleResize = () => {
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
    
        // 초기 로드 시 실행
        handleResize();
    
        // 리사이즈 이벤트에 대한 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

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
    
        // 호선, 역 이름이 모두 일치하는 배열의 index 찾기
        const foundIndex = stationData.findIndex(item => item[0] === randomLine && item[1] === inputValue);

        // 이미 setMyAnswr에 같은 값이 있는지 확인 (중복 선별)
        if (myAnswr.some(item => item[0] === randomLine && item[1] === inputValue)) {

            // 중복 이미지 노출
            setQuizResult('duplicate');
            quizResultEvent();
            setTimeout(() => { // 중복 이미지 노출 초기화
                setQuizResult(null);
            }, 1000);
            setInputValue(''); // input 초기화

        }else if (foundIndex !== -1) { // 정답일 경우

            setStationData(prevStationData => {
                const filteredData = prevStationData.filter(item => item[1] !== inputValue);// 원본 배열에서 역 이름이 일치하는 항목 모두 제거
                const excludedItems = prevStationData.filter(item => item[1] === inputValue);// 원본 배열에서 역 이름이 일치하는 항목 중복 답안 제출 방지를 위해 모두 setMyAnswr에 추가
                setMyAnswr(prevAnswr => [...prevAnswr, ...excludedItems]);
                
                // 정답 이미지 노출
                setQuizResult('correct');
                quizResultEvent();
                setTimeout(() => { // 정답 이미지 노출 초기화
                    setQuizResult(null);
                }, 1000);

                setMyScore((prevScore) => prevScore + 10); //점수 + 10

                return filteredData;// 새로운 배열로 업데이트
                
            });

            console.log('일치하는 항목의 랜덤호선:', randomLine);

        } else { // 오답일 경우

            // 오답 이미지 노출
            setQuizResult('wrong');
            quizResultEvent();
            setTimeout(() => { // 오답 이미지 노출 초기화
                setQuizResult(null);
            }, 1000);
        }
        
        //정답, 오답, 중복 공통
        clickRef.current.classList.remove('on');
        setInputValue(''); // input 초기화

        setTimeout(() => {
            // setRandomLine(Math.floor(Math.random() * 4+1));// 랜덤 호선 새로 돌리기 (다음 문제 시작)
            setQuizCount((prevCount) => prevCount + 1);// 다음 문제로 넘어가기 ++1
            setTimer(10);//타이머 초기화
            console.log('문제 번호', quizCount)
        }, 1050);
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
    
    // 타이머
    const timerEvent = () => {
        if(3 < timer && timer <= 10){
            return <img className="timer" src={`${process.env.PUBLIC_URL}/images/timer_${timer}s.png`} alt={`타이머`} />;
        }else if(0 <= timer && timer <= 3){
            return <img className="timer on" src={`${process.env.PUBLIC_URL}/images/timer_${timer}s.png`} alt={`타이머`} />;
        }else{
            goResult();//게임오버 ~ 결과페이지로
        }
    }    

    // 결과 페이지로 이동
    const goResult = () => {
        navigate(`/result/${myScore}`);
    }

    return (
        <>
            <div className="quiz_area">
                <strong className='quiz_count'>문제 {quizCount}</strong>
                <div className={`quiz line${randomLine}`}>
                    <p><span>{randomLine}호선</span><br/> 역 이름은?</p>
                </div>
                <div className="answer_area">
                    <form id="quiz_submit" onSubmit={handleSubmit}>
                        <label htmlFor="subwayName">
                            {/* 답안 입력 */}
                            <input
                                ref={inputRef}
                                id="subwayName"
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                value={inputValue}
                                onKeyPress={handleKeyUp}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </label>
                        <button id="answer_btn" type="submit" onClick={buttonClick}>
                            <img ref={clickRef} className='click' src={clickImg} alt="클릭"/>
                            <img src={submitBtnImg} alt="정답 제출하기"/>
                        </button>
                    </form>
                    <img className='mice' src={miceImg} alt="쥐"/>
                </div>
                {/* 정답, 오답, 중복 이미지 */}
                {quizResultEvent()}
                {/* 타이머 이미지 */}
                {timerEvent()}
            </div>
        </>
    );
};

export default Game;