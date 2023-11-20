import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Select = () => {
    let navigate = useNavigate();

    const [selectedLines, setSelectedLines] = useState([1, 2, 3, 4]); // 선택된 input value

    const handleCheckboxChange = (value) => {
        // 값이 이미 배열에 있는지 확인
        if (selectedLines.includes(value)) {
            // 배열에 있다면 제거
            setSelectedLines(selectedLines.filter(line => line !== value));
        } else {
            // 배열에 없다면 추가
            setSelectedLines([...selectedLines, value]);
        }
    };

    const goGame = () => {
        // 선택된 호선 배열을 사용하여 네비게이션 또는 기타 용도로 활용
        navigate(`/game/${selectedLines.join(',')}`);
    };

    return (
        <>
            <div className='select_area'>
                <label htmlFor='chk1'>
                    <input
                        type='checkbox'
                        id='chk1'
                        value={1}
                        checked={selectedLines.includes(1)}
                        onChange={() => handleCheckboxChange(1)}
                    />
                    1호선
                </label> 
                <label htmlFor='chk2'>
                    <input
                        type='checkbox'
                        id='chk2'
                        value={2}
                        checked={selectedLines.includes(2)}
                        onChange={() => handleCheckboxChange(2)}
                    />
                    2호선    
                </label> 
                <label htmlFor='chk3'>
                    <input
                        type='checkbox'
                        id='chk3'
                        value={3}
                        checked={selectedLines.includes(3)}
                        onChange={() => handleCheckboxChange(3)}
                    />
                    3호선   
                </label> 
                <label htmlFor='chk4'>
                    <input
                        type='checkbox'
                        id='chk4'
                        value={4}
                        checked={selectedLines.includes(4)}
                        onChange={() => handleCheckboxChange(4)}
                    />
                    4호선
                </label>

                <button onClick={goGame}>선택 끝 !</button>
            </div>
        </>
    );
};

export default Select;