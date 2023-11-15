import { ENG_KOR, KOR_ENG } from './common.js';
import KoreanIME from './ime.js';
import destructiveKorean from './destructiveKorean.js';

const engToKor = (v = '') => v.split('').map( c => ENG_KOR[c] || c ).reduce((p,key) => KoreanIME( p, key ), '');
const korToEng = (v = '') => destructiveKorean( v ).map((v)=> KOR_ENG[v] || v).join('')

export {
  engToKor,
  korToEng,
}