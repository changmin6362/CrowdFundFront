<!-- prettier-ignore-start -->
# 포켓몬 도감 프로젝트

## 개발 기간

2024.10 ~ 2025.01



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




### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)




---
## 핵심 기능

# 양방향 무한스크롤
https://github.com/user-attachments/assets/4c613430-527d-4ffb-ab2e-2507bc4883d6

# 검색 기능
https://github.com/user-attachments/assets/84b92071-a8c7-4cb0-9b46-ebb323d9b204







---
## 코드 설명

# 사용 api: PokeAPI
Link: https://github.com/PokeAPI/pokeapi?tab=readme-ov-file
각 포켓몬의 이름, 도감 번호, 타입, 이미지를 위 api에서 받아 옴

|<center>여러 api 요청을 배열로 반환하는 함수</center>|
|:----:|
|![fetchPokemonList](https://github.com/user-attachments/assets/c9d058cf-e5c0-4145-a5f0-635502bdebe2)|

|<center>처음 페이지를 불러왔을 때 초기 데이터를 불러오는 함수</center>|
|:----:|
![useGetDefaultItems](https://github.com/user-attachments/assets/e5e5d17e-21bb-4955-a4c5-dab189b5837e)

|<center>검색 데이터를 불러오는 함수</center>|
|:----:|
![useGetSearchItems](https://github.com/user-attachments/assets/a268eb02-0c33-4141-a5fd-ed0b2f20d44c)

|<center>검색 데이터를 기준으로, 위쪽 방향으로 무한스크롤이 트리거 될때 데이터를 2차원 배열 형태로 가져오는 함수</center>|
|:----:|
![useGetPreviousSearchItems](https://github.com/user-attachments/assets/8e3f487d-f45c-4946-b704-045c1f5367e1)


api 코드 구현|
|코드 작성 방식|








<!-- prettier-ignore-end -->
