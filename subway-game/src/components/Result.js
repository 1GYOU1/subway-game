import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import levelImg1 from '../img/level1.png';
import levelImg2 from '../img/level2.png';
import levelImg3 from '../img/level3.png';
import retryBtnImg from '../img/retry_btn.png';

const Result = () => {
	let navigate = useNavigate();
	const { scoreParams } = useParams();// 전달 받은 점수
	const [loading, setLoading] = useState(true);// 로딩 화면

	const [nextStageGo, setNextStageGo] = useState('nextStage'); // nextStage로 이동

	// 로딩 화면
	useEffect(() => {
        const loadingShow = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(loadingShow);
    }, []);

	const resultEvent = () => {
		if(scoreParams <= 30){
			return (
				<>
					<img id="level_img" className="level_img" src={levelImg1} alt="초보"/>
					<h4 className="score">{scoreParams}점</h4>
					<p className="result_txt">미아가 되었군요.<br/>역무원을 찾아가세요.</p>
				</>
			)
		}else if(scoreParams > 30 && scoreParams <= 60){
			return (
				<>
					<img id="level_img" className="level_img" src={levelImg2} alt="중수"/>
					<h4 className="score">{scoreParams}점</h4>
					<p className="result_txt">거의 다 왔어요.<br/>노선도를 유심히 보세요.</p>
				</>
			)
		}else{
			return (
				<>
					<img id="level_img" className="level_img" src={levelImg3} alt="고수"/>
					<h4 className="score">{scoreParams}점</h4>
					<p className="result_txt">원하는 역에 도착했어요.<br/>서울 쥐가 다 됐군요.</p>
				</>
			)
		}
	}

	// start 이동
	const retryEvent = () => {
		navigate('/start');
	}

	// intro/nextStage 이동
	const nextStageEvent = () => {
		navigate(`/${nextStageGo}`);
	}

	return (
		<>
			{loading ? (
                <div className="loading">
                    <strong>Loading...</strong>
                </div>
            ) : (
                <div className="result_area">
                    <div>
                        {resultEvent()}
                    </div>
                    <button className="retry_btn" onClick={retryEvent}>
                        <img className="level_img" src={retryBtnImg} alt="다시하기" />
                    </button>
                    {scoreParams >= 70 ? (
                        <button className="next_btn" onClick={nextStageEvent}>
                            <img className="level_img" src={retryBtnImg} alt="레벨업" />
                        </button>
                    ) : null}
                </div>
            )}
		</>
	)
}

export default Result