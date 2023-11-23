import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import levelImg1 from '../img/level1.png';
import levelImg2 from '../img/level2.png';
import levelImg3 from '../img/level3.png';
import nextStageImg1 from '../img/hard_level1.png';
import nextStageImg2 from '../img/hard_level2.png';
import nextStageImg3 from '../img/hard_level3.png';
import retryBtnImg from '../img/retry_btn.png';
import nextStageBtnImg from '../img/levelup_btn.png';

const Result = () => {
	let navigate = useNavigate();
	const { params1, params2 } = useParams();// 전달 받은 점수
	const [loading, setLoading] = useState(true);// 로딩 화면

	const [nextStageGo, setNextStageGo] = useState('nextStage'); // nextStage로 이동

	// 로딩 화면
	useEffect(() => {
		console.log(params1, params2)
        const loadingShow = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(loadingShow);
    }, []);

	const resultEvent = () => {
		console.log(params1, params2)
		if(params1 === 'nextStage'){
			if(params2 <= 30){
				return (
					<>
						<img id="level_img" className="level_img" src={nextStageImg1} alt="마스터 실패"/>
						<h4 className="score">{params2}점</h4>
						<p className="result_txt">불태웠지만...<br/></p>
					</>
				)
			}else if(params2 > 30 && params2 <= 60){
				return (
					<>
						<img id="level_img" className="level_img" src={nextStageImg2} alt="노력형"/>
						<h4 className="score">{params2}점</h4>
						<p className="result_txt">점수 40 ~ 60<br/></p>
					</>
				)
			}else{
				return (
					<>
						<img id="level_img" className="level_img" src={nextStageImg3} alt="마스터"/>
						<h4 className="score">{params2}점</h4>
						<p className="result_txt">당신은 지하철 역 마스터.<br/>혹시 역무원 ?</p>
					</>
				)
			}
		}else{
			if(params1 <= 30){
				return (
					<>
						<img id="level_img" className="level_img" src={levelImg1} alt="초보"/>
						<h4 className="score">{params1}점</h4>
						<p className="result_txt">미아가 되었군요.<br/>역무원을 찾아가세요.</p>
					</>
				)
			}else if(params1 > 30 && params1 <= 60){
				return (
					<>
						<img id="level_img" className="level_img" src={levelImg2} alt="중수"/>
						<h4 className="score">{params1}점</h4>
						<p className="result_txt">거의 다 왔어요.<br/>노선도를 유심히 보세요.</p>
					</>
				)
			}else{
				return (
					<>
						<img id="level_img" className="level_img" src={levelImg3} alt="고수"/>
						<h4 className="score">{params1}점</h4>
						<p className="result_txt">원하는 역에 도착했어요.<br/>서울 쥐가 다 됐군요.<br/>난이도를 올려<br/>지하철 역 마스터에 도전해보세요 !</p>
					</>
				)
			}
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
					{params1 >= 70 ? (
                        <button className="next_btn" onClick={nextStageEvent}>
                            <img src={nextStageBtnImg} alt="레벨업" />
                        </button>
                    ) : null}
                    <button className="retry_btn" onClick={retryEvent}>
                        <img src={retryBtnImg} alt="다시하기" />
                    </button>
                </div>
            )}
		</>
	)
}

export default Result