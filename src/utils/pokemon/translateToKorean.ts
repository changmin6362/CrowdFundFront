import { POKEMON_TYPE_KR } from "@/constants/pokedexList";

// 단일 타입 문자열을 한글로 변환
export default function translateType(type: string): string {
  return POKEMON_TYPE_KR[type as keyof typeof POKEMON_TYPE_KR] || type;
}
