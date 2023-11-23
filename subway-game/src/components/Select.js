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

    const goHowTo = () => {
        if (selectedLines.length === 0) {
            // 선택된 항목이 없을 때 얼럿창 띄우기
            alert('하나 이상의 항목을 선택하세요!');
        } else {
            // 선택된 호선 배열로 전달
            // navigate(`/game/${selectedLines.join(',')}`);
            navigate(`/go/${selectedLines.join(',')}`);
        }
    };

    return (
        <>
            <div className='select_area'>
                <strong className='title'>플레이할 호선을 <br/>선택해주세요 !</strong>
                <input
                    type='checkbox'
                    id='chk1'
                    value={1}
                    checked={selectedLines.includes(1)}
                    onChange={() => handleCheckboxChange(1)}
                /> 
                <label htmlFor='chk1'></label>
                <input
                    type='checkbox'
                    id='chk2'
                    value={2}
                    checked={selectedLines.includes(2)}
                    onChange={() => handleCheckboxChange(2)}
                />    
                <label htmlFor='chk2'></label>
                <input
                    type='checkbox'
                    id='chk3'
                    value={3}
                    checked={selectedLines.includes(3)}
                    onChange={() => handleCheckboxChange(3)}
                />    
                <label htmlFor='chk3'></label>
                <input
                    type='checkbox'
                    id='chk4'
                    value={4}
                    checked={selectedLines.includes(4)}
                    onChange={() => handleCheckboxChange(4)}
                />
                <label htmlFor='chk4'></label>
                <button onClick={goHowTo}>선택 끝 !</button>
            </div>
        </>
    );
};

export default Select;