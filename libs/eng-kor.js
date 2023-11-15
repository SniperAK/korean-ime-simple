const { ENG_KOR, KOR_ENG } = require('./common');
const KoreanIME = require('./ime');
const destructiveKorean = require('./destructiveKorean');

const engToKor = (v = '') => v.split('').map( c => ENG_KOR[c] || c ).reduce((p,key) => KoreanIME( p, key ), '');
const korToEng = (v = '') => destructiveKorean( v ).map((v)=> KOR_ENG[v] || v).join('')

module.exports = {
  engToKor,
  korToEng,
}