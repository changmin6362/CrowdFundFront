<!-- prettier-ignore-start -->
# 포켓몬 도감 프로젝트


- 모바일에서 손쉽고 빠르게 포켓몬의 타입, 약점을 검색할 수 있는 사이트



## 개발 기간

2024.11 ~ 2025.02



기술 스택 ⚙️
--

### Development
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://github.com/facebook/react)
[![Next JS](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white)](https://github.com/vercel/next.js)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://github.com/tailwindlabs/tailwindcss)
[![pokeapi-js-wrapper](https://img.shields.io/badge/pokeapi-js-wrapper?style=flat&logoColor=yellow&labelColor=black)](https://github.com/PokeAPI/pokeapi-js-wrapper)
[![react-swipeable](https://img.shields.io/badge/react-swipeable?style=flat&label=react-swipeable)](https://github.com/FormidableLabs/react-swipeable?tab=readme-ov-file)
[![tesseract.js](https://img.shields.io/badge/Tesseract.js-black?style=flat&logo=tesseract)](https://github.com/naptha/tesseract.js#tesseractjs)
[![react-image-crop](https://img.shields.io/badge/react-image-crop?style=flat&logo=react-image-crop)](link=https%3A%2F%2Fgithub.com%2Fdominictobias%2Freact-image-crop)


- ssr을 사용하지 않는데 Next.js를 사용한 이유:
  - 이미지, 폰트 자동 최적화 기능
  - Vercel을 통한 배포 용이성

- TailwindCss를 사용한 이유
  - 디자인 로직을 레이어 시스템을 통해 한 곳에서 관리하고 비즈니스 로직과 분리하기 위해
  - 빠르고 간편한 디자인 구현을 위해서

- react-swipeable을 사용한 이유
  - 좌우 스와이프 애니메이션을 별도의 커스텀훅 사용 없이 간편하게 구현하기 위해
 
- pokeapi-js-wrapper를 사용한 이유
  - 필요한 포켓몬 정보를 빠르고 손쉽게 받아오기 위해서

- tesseract.js를 사용한 이유
  - api를 사용하지 않고 개발서버에서 직접 ocr을 수행하는 라이브러리라서
  - 문장이 아닌 짧은 단어에 대한 ocr을 수행하기에 적절한 수준의 정확성을 지녀서

- react-image-crop을 사용한 이유
  - ocr 기능을 수행할 때 받아온 이미지 파일을 브러우저에서 크롭처리하기 위해



---
## 핵심 기능


## 양방향 무한스크롤 기능
  - 윗방향 api 커스텀훅: [useGetPreviousSearchItems.ts](src/api/useGetPreviousSearchItems.ts)
  - 아랫방향 api 커스텀 훅: [useGetSearchItems.ts](src/api/useGetSearchItems.ts)
  - 무한스크롤 훅: [useInfiniteScroll.ts](src/hooks/scrollEvent/useInfiniteScroll.ts)
  - 스켈레톤 UI: [PreloadedSkeletonUI.tsx](src/app/components/page/main/pokedex/components/pokedexScrollView/preloadedSkeletonUI/index.tsx)
  - 렌더링 컴포넌트: [PokedexScrollView.tsx](src/app/components/page/main/pokedex/components/pokedexScrollView/index.tsx)


    - 구현 방식:
      - 아랫방향: 일반적인 무한스크롤 방식과 동일함.
      - 윗방향: PreloadedSkeletonUI에서 미리 스켈레톤UI를 렌더링해둠. api 요청이 발생할 때마다 스켈레톤UI에 데이터를 전달한 뒤에 다음 데이터를 위한 스켈레톤UI를 렌더링 함
      
    - 위처럼 구현한 이유:
      - 위쪽 방향에 데이터가 추가되서 DOM 업데이트가 발생하면 브라우저가 스크롤 위치를 자동으로 유지시켜주지 못했습니다. 그래서 데이터가 추가되기 전에 미리 스켈레톤 UI를 렌더링함으로써 스크롤 위치가 유지되게 구현해야 했습니다.
      - 그리고 스켈레톤 UI에서 각 요청마다 searchItemGroups의 어느 데이터를 가져와야 할 지 명확하게 나타내기 위해 2차원 배열의 형태로 관리했습니다.
        

## 검색 네비게이션 기능

  - 기본 데이터를 관리하는 훅: [useDefaultData.ts](src/hooks/useSearchNavigation/useData/useDefaultData.ts)
  - 검색 데이터를 관리하는 훅: [useSearchData.ts](src/hooks/useSearchNavigation/useData/useSearchData.ts)
  - 검색 훅: [useSearchNavigation.ts](src/hooks/useSearchNavigation/index.ts)
  - 네비게이션 훅: [useScrollToElement.ts](src/hooks/feature/useScrollToElement.ts)

  - 구현 방식:
    - 포켓몬 이름을 받아서 포켓몬 ID로 반환하는 로직
    - 기본 데이터와 검색 데이터를 통합 관리하며, 포켓몬 ID를 기반으로 검색한 아이템의 위치로 스크롤 이동하는 로직
    - 기본 데이터는 포켓몬 도감을 1번부터 불러오는 데이터, 검색 데이터는 포켓몬 도감을 검색한 id를 기준으로 불러오는 데이터.


## 자동완성 기능

  - 텍스트 검색 로직: [TextSearch.tsx](src/app/components/page/main/pokedex/components/searchBar/textSearch/index.tsx)
  - 자동완성 로직 훅: [useAutoComplete.ts](src/hooks/autoComplete/useAutoComplete.ts)
  - 구현 방식: PokemonNameData에서 포켓몬의 이름 데이터를 가져와서 자동완성 목록을 보여줌



## OCR 기능

  - ocr 커스텀 훅: [useOCR.ts](src/hooks/ocr/useOCR.ts)
  - 이미지 검색 컴포넌트: [ImageSearch.tsx](src/app/components/page/main/pokedex/components/searchBar/imageSearch/index.tsx)
  - 이미지 크롭 훅: [useImageCrop.ts](src/hooks/imageCrop/useImageCrop.ts)
  - 이미지 크롭 컴포넌트: [ImageCropModal.tsx](src/app/components/page/main/pokedex/components/searchBar/imageSearch/imageCropModal/index.tsx)

  - 구현 방식: 이미지 파일을 크롭하면 해당 범위 내의 이미지를 OCR로 텍스트를 추출함

## 포켓몬 상세 보기 기능

- 스와이프 기능 컴포넌트: [SwipeContainer.tsx](src/app/components/layout/SwipeContainer.tsx)
- 상세 정보 표시 컴포넌트: [PokemonInfoDisplay.tsx](src/app/components/page/main/PokemonInfoDisplay/index.tsx)

- 구현 방식: api 응답 객체를 받아서 가공함


## 코드 작성 방식

- 디자인 로직: 테일윈드의 @layer 지시문을 사용하여 의존성이 있거나 재사용 가능성이 있는 디자인 로직을 한 곳에서 관리함
  - 폰트 적용 범위, 기본 스타일: [base.css](src/app/styles/base.css)
  - 재사용 가능한 컴포넌트 스타일: [components.css](src/app/styles/components.css)
  - 색상 및 스크롤바 숨김 스타일 등의 수정 가능성이 있는 스타일을 유틸리티 타입으로 선언함: [utilities.css](src/app/styles/utilities.css)

- 훅 관리: 컴포넌트의 동작과 구분되는 로직 중에 복잡한 로직을 hooks 폴더로 분리함
- 유틸 관리: 컴포넌트의 동작과 구분되는 로직 중에 간단한 로직을 utils 폴더로 분리함
- 컴포넌트 관리: UI를 수정하기 쉽도록 디자인 로직이 있는 공통 컴포넌트를 UI 폴더로 분리함




<!-- prettier-ignore-end -->
