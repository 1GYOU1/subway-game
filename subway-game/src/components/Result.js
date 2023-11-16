import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import levelImg1 from '../img/level1.png';
import levelImg2 from '../img/level2.png';
import levelImg3 from '../img/level3.png';
import retryBtnImg from '../img/retry_btn.png';

const Result = () => {
	let navigate = useNavigate();
	const { scoreParams } = useParams();// 점수

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

	const retryEvent = () => {
		navigate('/start');
	}

	return (
		<>
			<div className="result">
				<div>
					{resultEvent()}
				</div>
				<button className="retry_btn" onClick={retryEvent}>
					<img className="level_img" src={retryBtnImg} alt="다시하기"/>
				</button>
			</div>
		</>
	)
}

export default Result