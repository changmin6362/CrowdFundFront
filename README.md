<!-- prettier-ignore-start -->
# CrowdFundFront 프로젝트


- 크라우드 펀딩 플랫폼의 프론트엔드 프로젝트입니다.



## 개발 기간

2026.06.08 ~ 2026.06.11(개발중)



기술 스택 ⚙️
--

### Development
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://github.com/facebook/react)
[![Next JS](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white)](https://github.com/vercel/next.js)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://github.com/tailwindlabs/tailwindcss)
[![react-swipeable](https://img.shields.io/badge/react-swipeable?style=flat&label=react-swipeable)](https://github.com/FormidableLabs/react-swipeable?tab=readme-ov-file)


## 브랜치 전략 (Git Flow)

- **`main`** : 제품으로 배포되는 가장 안정적인 브랜치입니다. (Vercel 자동 배포)
- **`develop`** : 다음 출시 버전을 개발하는 통합 브랜치입니다.
- **`feature/기능명`** : 기능을 개발하거나 수정을 진행하는 작업 브랜치입니다. (`develop`에서 분기)

### 개발 워크플로우
1. `develop` 브랜치에서 작업 브랜치(`feat/` 또는 `refactor/`)를 분기합니다.
2. 기능 개발 후 `develop` 브랜치로 **Pull Request (PR)**를 생성합니다.
3. 코드 리뷰 및 `develop` 환경에서 테스트를 진행합니다.
4. 테스트가 완료된 코드는 최종적으로 `main` 브랜치에 머지되어 배포됩니다.


## 프로젝트 구조 (Project Structure)

```text
src/
├── api/              API 통신 및 데이터 요청 관련 로직을 모아둔 폴더입니다.
├── app/              Next.js App Router 기반의 페이지 레이아웃 및 라우팅을 담당합니다.
├── assets/           이미지, 폰트, 아이콘 등 정적 자원을 관리하는 폴더입니다.
├── components/       재사용 가능한 공통 UI 컴포넌트를 정의합니다.
├── constants/        프로젝트 전역에서 사용되는 상수 값을 관리합니다.
├── contexts/         전역 상태 관리를 위한 React Context를 정의합니다.
├── hooks/            재사용 가능한 커스텀 훅을 모아둔 폴더입니다.
├── styles/           Tailwind CSS 전역 설정 및 스타일 시트를 관리합니다.
└── utils/            공통 유틸리티 함수 및 TypeScript 타입 정의를 포함합니다.
```


<!-- prettier-ignore-end -->
