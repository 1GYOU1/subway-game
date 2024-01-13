# subway-game

- 2023년 11월 진행
- React.js 라이브러리, 지하철 노선도 API를 사용하여 지하철 랜덤 호선 맞추기 게임 구현

<br>

### 👀 MainPage View

![지하철_1](https://github.com/1GYOU1/subway-game/assets/90018379/ed896173-a40d-4896-aaf7-31112f4cd183)
![지하철_2](https://github.com/1GYOU1/subway-game/assets/90018379/61408d90-1f91-46ff-963a-41ad63588d21)
![지하철_3](https://github.com/1GYOU1/subway-game/assets/90018379/4851c520-d564-463e-b414-59d7ba9bd087)
![지하철_4](https://github.com/1GYOU1/subway-game/assets/90018379/ccc09b0e-d79d-4500-ad5f-152f9a44e16e)
![지하철_5](https://github.com/1GYOU1/subway-game/assets/90018379/c94ff9f5-9094-42bd-a98c-63d903e8a3d2)



<br>

### 📌 주요 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-F68212?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>

<img src="https://img.shields.io/badge/Adobe Photoshop-31A8FF?style=flat-square&logo=Adobe Photoshop&logoColor=white"/>
<img src="https://img.shields.io/badge/Adobe Illustrator-FF9A00?style=flat-square&logo=Adobe Illustrator&logoColor=white"/>

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>

<br>

### 📌 주요 기능
- 인트로 애니메이션
- 지하철 노선도 API
- 숫자 랜덤 노출
- 타이머
- 정답, 오답, 중복 체크
<br>

### Github Pages
https://1gyou1.github.io/subway-game/

<br>

### 프로젝트 진행 과정

1. <details>
    <summary>프로젝트 기획/구상</summary> 

    ![ppt1](https://github.com/1GYOU1/subway-game/assets/90018379/a6a40a13-4f5e-493f-baa6-61316b1da202)
    ![ppt3](https://github.com/1GYOU1/subway-game/assets/90018379/fdfd46c4-7d2e-44c1-9034-797a920ed689)
    ![ppt4](https://github.com/1GYOU1/subway-game/assets/90018379/5ea033e1-5eb5-4303-9d98-2303e2265185)
    ![ppt5](https://github.com/1GYOU1/subway-game/assets/90018379/cc6f0e67-982f-4249-9bcd-a0bcccb67b8e)
    ![ppt7](https://github.com/1GYOU1/subway-game/assets/90018379/a5bb4dc3-98dc-4919-acbb-c4ee205ccc9c)
    ![ppt8](https://github.com/1GYOU1/subway-game/assets/90018379/488a3dba-d184-4f4c-af49-70492c1f1fd4)
    ![ppt9](https://github.com/1GYOU1/subway-game/assets/90018379/f1ec9668-e10b-42e5-bde6-ca380c45681e)
    ![ppt10](https://github.com/1GYOU1/subway-game/assets/90018379/36a1e7d2-b094-4c93-8b7d-0c0df4727cf2)
    ![ppt11](https://github.com/1GYOU1/subway-game/assets/90018379/1a7a00e8-409a-44f5-896f-c91056023ab2)
    ![ppt12](https://github.com/1GYOU1/subway-game/assets/90018379/a40c6ed0-96a1-426f-bb32-a05a7c6b475c)
    ![ppt13](https://github.com/1GYOU1/subway-game/assets/90018379/3ec6bd75-2319-4dba-aa91-4778ddbe1ad1)
    ![ppt14](https://github.com/1GYOU1/subway-game/assets/90018379/9c85156a-b21f-4817-a689-f28e2e498f98)
    ![ppt15](https://github.com/1GYOU1/subway-game/assets/90018379/90b467ab-00a7-4ff7-9ee0-2854ef56c62f)
    ![ppt16](https://github.com/1GYOU1/subway-game/assets/90018379/91e78bb8-298e-4f27-8f71-72013354ba19)

    </details>

2. 프로젝트 설치, 개발 환경 세팅
3. 인트로 애니메이션 구현
4. 게임 시작, 방법 화면 구현
5. 체크박스로 노선 선택해서 선택한 노선만 랜덤 호출 (Select.js)
    <br>ㄴ 처음 게임 옵션은 1, 2, 3, 4호선 중에 선택하여 랜덤
    <br>ㄴ 업그레이드 버전은 1, 2, 3, 4, 5, 6, 7, 8, 9호선 모두 랜덤 고정
6. 0 ~ 4중에 랜덤으로 숫자 노출 
    ㄴ한 문제마다 랜덤 돌리기
    <br>ㄴ Select 컴포넌트에서 선택한 호선 배열로 가져오고 index 랜덤으로 돌려서 출력
7. api 맨 처음 한번만 가져오기. ex - {['01호선', '평택역']}
    <br>ㄴ 필요한 형태로 가져오기{{ LINE_NUM, STATION_NM }, [1, 평택], [1, 금정]}
    <br>ㄴ 서울역 예외처리 - 데이터가 '서울'이 아닌 '서울역'으로 되어있어서 수정 필요.
8. input (정답 칸에)입력 텍스트 받아오기
    ㄴ입력한 값 useState에 넣고(inputValue) 특수문자, 영어, 숫자 입력 제한
9. input에 답안 입력 후 엔터키, 클릭 시 제출, 초기화
    <br>ㄴ 자동 input focus
10. 제출한 입력값이 api 요소의 호선(0번째 배열 요소값), 역 이름(1번째 배열 요소값)이 비교
    <br>ㄴ 맞으면 원본배열에서 삭제, 내 맞춘 답안 정답 배열 setCorrect에 넣기
    <br>ㄴ 같은 역이름을 가진 다른 호선 배열 값도 삭제(중복 체크), 내 맞춘 답안 정답 배열 setCorrect에 넣기
    <br>ㄴ 이미 정답 배열에 있는 값이라면 중복 이미지 노출 
11. 정답, 오답, 중복 이미지 노출
    <br>ㄴ 정답, 오답, 중복이면 다음 문제 노출
    <br>ㄴ 정답이면 quizCount++ (퀴즈 타이틀 숫자 + 1)
    <br>ㄴ 정답이면 myScore 점수 올리기 (한 문제당 + 10)
12. 최대 10문제 진행 quizCount++
13. 타이머기능 10초 -> 10초 지나면 게임 오버. (결과 페이지로)
14. 새로 고침 방지
15. 결과 값 params로 전달
16. 결과 페이지 노출 (상, 중, 하)
17. Next stage
    <br>ㄴ nextStage intro.js
    <br>ㄴ nextStage Go.js
    <br>ㄴ 1~9호선 랜덤 노출
    <br>ㄴ 5초 안에 맞추기
18. nextStage에서 게임오버하면 nextStage로 재시작 버튼 생성
    <br>ㄴ 처음부터 버튼도 생성
