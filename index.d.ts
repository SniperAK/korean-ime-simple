declare module 'korean-ime' {
  export = KoreanIme;
  
  declare function KoreanIme(prev: string, input: string ): string;
  declare function engToKor(value : string): string;
  declare function korToEng(value : string): string;
  declare function destructiveKorean(value : string): string[];
  
  export = engToKor;
  export = korToEng;
  export = destructiveKorean;
}