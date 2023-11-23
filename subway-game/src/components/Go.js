import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Intro = () => {
    const { params } = useParams();// Select.js에서 선택한 호선 전달 값, 또는 'nextStage'
    let navigate = useNavigate();

    useEffect(() => {
        console.log(params)
        if (params === 'nextStage') {
            //nextStage game.js로 이동
            console.log('여기는 nextStage Go.js')
            const timeoutId = setTimeout(() => {
                navigate(`/game/${params}`);
            }, 1500);
            return () => clearTimeout(timeoutId);

        } else {
            console.log('여기는 first Go.js')
            const timeoutId = setTimeout(() => {
                navigate(`/game/${params}`);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [params, navigate]);
    
    return (
        <>
            {params === 'nextStage' ? (
                // nextStage intro
                <div className='next_go'>
                    <strong className='game_txt'>Next Stage</strong>
                    <strong className='start_txt'>Start!</strong>
                </div>
            ) : (
                <div className='go_area'>
                    <strong className='game_txt'>Game</strong>
                    <strong className='start_txt'>Start!</strong>
                </div>
            )}
        </>
    );
};

export default Intro;