declare module 'korean-ime-simple' {
  // KoreanIME 함수 정의
  export default function KoreanIME(prev: string, input: string): string;

  // eng-kor 모듈의 함수 정의
  export function engToKor(value: string): string;
  export function korToEng(value: string): string;

  // destructiveKorean 모듈의 함수 정의
  export function destructiveKorean(value: string): string[];
}