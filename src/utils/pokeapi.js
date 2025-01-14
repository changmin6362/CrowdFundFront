import { Pokedex } from "pokeapi-js-wrapper";

// pokeapi-js-wrapper api가 제공하는 커스텀 옵션
const customOptions = {
  protocol: "https", // 프로토콜 통신 방식을 결정하는 옵션
  hostName: "pokeapi.co", // localhost:443 - 개발용 주소, pokeapi.co - 실제 서비스 주소
  versionPath: "/api/v2/", // api의 버전을 결정하는 옵션
  cache: true, // api 통신의 캐시 사용 여부를 결정하는 옵션
  timeout: 5 * 1000, // 5s 통신 제한시간
  cacheImages: false, // 이미지를 캐시할지 결정하는 옵션; Service Worker를 통해 제공된다.
  useServiceWorker: false, // Service Worker 비활성화
};

export const P = new Pokedex(customOptions);
