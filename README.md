<!-- prettier-ignore-start -->
# 포켓몬 도감 프로젝트


- 포켓몬의 이름을 검색해서 해당 포켓몬의 타입, 약점을 빠르게 찾아볼 수 있도록 도와주는 사이트



## 개발 기간

2024.11 ~ 2025.01



기술 스택 ⚙️
--

### Development
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pokeapi-js-wrapper](https://img.shields.io/badge/pokeapi-js-wrapper?style=for-the-badge&logoColor=yellow&labelColor=black)
![react-swipeable](https://img.shields.io/badge/react-swipeable?style=for-the-badge&label=react-swipeable)


- ssr을 사용하지 않는데 Next.js를 사용한 이유:
  - 이미지, 폰트 자동 최적화 기능
  - Vercel을 통한 배포 용이성

- TailwindCss를 사용한 이유
  - 디자인 로직을 레이어 시스템을 통해 한 곳에서 관리하기 위해
  - 빠르고 간편한 디자인 구현을 위해서

- react-swipeable을 사용한 이유
  - 좌우 스와이프 애니메이션을 간편하게 구현하기 위해서
 
- pokeapi-js-wrapper를 사용한 이유
  - 필요한 포켓몬 정보를 빠르고 손쉽게 받아오기 위해서
  - Link: https://github.com/PokeAPI/pokeapi?tab=readme-ov-file



### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)




---
## 핵심 기능


|<center>양방향 무한스크롤</center>|
|:----:|
|![양방향 무한스크롤](https://github.com/user-attachments/assets/0675d8bd-8c45-4e44-8794-f7503ff3d55e)|

## 양방향 무한스크롤 기능

- 검색 기능이 동작하면 검색한 데이터를 기준으로 새로운 데이터가 불러와지는데, 검색 데이터를 불러온 상황에서  양방향 무한스크롤을 구현함.
  
  1. 위쪽 방향 무한스크롤의 경우
     
    - api 커스텀훅: [useGetPreviousSearchItems.ts](src/api/pokemon/useGetPreviousSearchItems.ts)
      - 받아온 추가 데이터를 2차원 배열의 형태로 받아와서 관리함. 즉, 추가 데이터가 searchItemGroups 라는 배열 형태의 상태값의 element로 저장될 때, 배열의 형태로 저장함.
      - 예시)    [[1번째 추가 데이터, ...], [2번째 추가 데이터, ...], [3번째 추가 데이터, ...], ...]와 같은 형태
 
    - 렌더링 컴포넌트: [PokedexScrollView.tsx](src/app/components/page/main/pokedex/PokedexScrollView.tsx)
      - api 요청이 발생할 때마다 추가 데이터가 스켈레톤 UI에 할당되어서 컨텐츠 UI가 되고, 다음 api 요청이 발생할 때 추가 데이터가 전달될 새로운 스켈레톤 UI가 미리 렌더링 도도록 구현함.
      
    - 위처럼 구현한 이유:
      - 위쪽 방향에 데이터가 추가되서 DOM 업데이트가 발생하면 브라우저가 스크롤 위치를 자동으로 유지시켜주지 못했습니다. 그래서 데이터가 추가되기 전에 미리 스켈레톤 UI를 렌더링함으로써 스크롤 위치가 유지되게 구현해야 했습니다.
      - 그리고 스켈레톤 UI에서 각 요청마다 searchItemGroups의 어느 데이터를 가져와야 할 지 명확하게 나타내기 위해 2차원 배열의 형태로 관리했습니다.
        
  2. 아래쪽 방향 무한스크롤의 경우
     
    - api 커스텀 훅: [useGetSearchItems.ts](src/api/pokemon/useGetSearchItems.ts)
      - 받아온 추가 데이터를 searchItems라는 배열 형태의 상태값의 뒷부분에 결합하는 형태로 저장함

    - 렌더링 컴포넌트: [PokedexScrollView.tsx](src/app/components/page/main/pokedex/PokedexScrollView.tsx) : 검색 기능 때문에 searchItems와 defaultItems를 결합한 displayList를 받아옴
      - searchItems를 map으로 콘텐츠 UI에 전달해서 searchItems가 변경되면 추가 데이터가 렌더링 되도록 구현함
  
    - 위처럼 구현한 이유
      - 브라우저가 스크롤 위치를 자동으로 유지시켜주기 때문에 추가 데이터를 미리 렌더링하지 않아도 정상적으로 동작함.

  
|<center>검색 기능</center>|
|:----:|
|![검색기능](https://github.com/user-attachments/assets/c8a08e65-8f2f-4e9a-b89d-1404e075ede9)|
## 검색 기능

- 검색창에 포켓몬의 이름을 검색하면 해당 포켓몬의 위치로 이동하는 기능을 구현함.

  - 검색 기능을 수행하는 컴포넌트: [useSearchPokemon.ts](src/utils/pokemon/useSearchPokemon.ts)
    - 포켓몬 이름을 검색창에 입력하면 해당 포켓몬의 id를 기준으로 해당 id가 현재 defaultItems, searchItems, searchItemGroups에 존재하는지 확인함.
    - 만약 존재한다면 해당 포켓몬의 위치로 이동시킴
    - 존재하지 않는다면 [useGetSearchItems.ts](src/api/pokemon/useGetSearchItems.ts)에 의해 api 요청이 발생하고 해당 포켓몬부터 시작하는 리스트가 렌더링 됨.
    - 렌더링이 끝난 뒤에 해당 포켓몬의 위치로 이동시킴
     
    
  - 이동 기능을 수행하는 컴포넌트: [useScrollToElement.ts](src/hooks/feature/useScrollToElement.ts)
    - scrollToElementRef를 통해서 마운트 된 DOM 요소와 id를 Map 형태의 ref에 저장함. [useRefMap.ts](src/hooks/feature/useRefMap.ts)
    - scrollToElement를 통해서 Map에 저장된 element의 id를 이용해서 해당 element의 위치로 이동시킴.


  
|<center>정보 표시 기능</center>|
|:----:|
|![정보 표시 스와이프](https://github.com/user-attachments/assets/003a43c4-c56e-49ba-9eeb-dd79eeb38919)|

## 정보 표시 기능

  - api 활용 방식 및 한계점
    - api는 포켓몬의 id값을 통해서만 검색이 가능하므로, 포켓몬의 국가별 이름과 id값이 포함된 데이터를 미리 요청 받아서 MockData 형태로 저장함.[Pokedex.json](src/app/assets/mockData/Pokedex.json)
    - 해당 MockDat와 검색창의 입력값을 대조함으로써 포켓몬의 국가별 이름을 통해 검색할 수 있게 구현함.
    - 포켓몬의 타입 정보는 제공받을 수 있지만 약점 정보는 받을 수 없으므로, 타입 정볼르 통ㄹ해 약점을 계산하는 훅을 구현함.[calculateWeaknesses.ts](src/utils/calculateWeaknesses.ts)
    - (미구현)포켓몬의 특성 정보를 제공받을 수 있지만, api 요청이 지금의 3배이상 발생하게 되어서, 이를 미리 요청 받아서 MockData 형태로 저장하려 함.

## 디자인 로직 처리 방식

- 디자인 로직이 선언된 부분을 ui 폴더에 모듈화해서 디자인 로직과 비즈니스 로직을 분리함
- 폰트 적용 범위, 재사용 가능성이 있는 디자인, 그리고 수정 가능성이 있는 디자인 로직은 레이어 시스템을 통해 한곳에서 관리함.
  - 폰트 적용 범위, 기본 스타일: [base.css](src/app/styles/base.css)
  - 재사용 가능한 컴포넌트 스타일: [components.css](src/app/styles/components.css)
  - 색상 및 스크롤바 숨김 스타일 등의 수정 가능성이 있는 스타일을 유틸리티 타입으로 선언함: [utilities.css](src/app/styles/utilities.css)






<!-- prettier-ignore-end -->
