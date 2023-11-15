declare module 'KoreanIme' {
  function KoreanIme(prev: string, input: string ): string;
  function destructiveKorean(value : string): string[];
  function engToKor(value : string): string;
  function korToEng(value : string): string;
}