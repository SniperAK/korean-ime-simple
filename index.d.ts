declare type KoreanIme = (prev: string, input: string )=> string;
export default KoreanIme;

declare type destructiveKorean = (value : string) => string[];
declare type engToKor = (value : string) => string;
declare type korToEng = (value : string) => string;
export {
  destructiveKorean,
  engToKor,
  korToEng,
}