const FIRST    =  'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const MIDDLE   =  'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const LAST     =  'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const FIRSTs   =  FIRST.split('');
const MIDDLEs  =  MIDDLE.split('');
const LASTs    =  ['',...LAST.split('')];

const R   = {S:'가'.charCodeAt(0), E:'힣'.charCodeAt(0)};
const SR  = {S:'ㄱ'.charCodeAt(0), E:'ㅎ'.charCodeAt(0)};
const BR  = {S:'ㅏ'.charCodeAt(0), E:'ㅣ'.charCodeAt(0)};

const assembleD_MIDDLE     = { 'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ','ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ'}; 
const DISassembleD_MIDDLE  = { 'ㅘ':'ㅗㅏ','ㅙ':'ㅗㅐ','ㅚ':'ㅗㅣ','ㅝ':'ㅜㅓ','ㅞ':'ㅜㅔ','ㅟ':'ㅜㅣ','ㅢ':'ㅡㅣ'}; 
const assembleD_LAST       = { 'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ','ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ'     };
const DISassembleD_LAST    = { 'ㄳ':'ㄱㅅ','ㄵ':'ㄴㅈ','ㄶ':'ㄴㅎ','ㄺ':'ㄹㄱ','ㄻ':'ㄹㅁ','ㄼ':'ㄹㅂ','ㄽ':'ㄹㅅ','ㄾ':'ㄹㅌ','ㄿ':'ㄹㅍ','ㅀ':'ㄹㅎ','ㅄ':'ㅂㅅ'};

const assemble = (first,middle,last)=>{
  if( first  && !middle ) return first;
  if( !first && middle ) return assembleD_MIDDLE[ middle ] || middle;
  if( !first && !middle && !last) return '';
  // console.log('assemble', first,middle, last );
  let li          = LAST.indexOf( assembleD_LAST[ last ] || last );
  return String.fromCharCode( 
    R.S + 
    (21 * 28 * FIRST.indexOf( first )) + 
    (28 * MIDDLE.indexOf( assembleD_MIDDLE[ middle ] ||  middle )) + 
    (li >= 0 ? li + 1 : li < 0 ? 0 : li)  //(li > 0 ? li + 1 : li <= 0 ? 0 : li) 
  ); 
}

const disassemble = (v)=>{
  if( v == FIRST.indexOf(v) > -1 ) return [v];
  if( v == MIDDLE.indexOf(v) > -1 ) return [undefined, v];

  const c = v.charCodeAt(0);                          // [P]rev[C]ode

  const li =    (c - R.S) % 28;                        // 종성 인덱스
  const mi =  (((c - R.S) - li) / 28 ) % 21;           // 중성 인덱스
  const fi = ((((c - R.S) - li) / 28 ) - mi ) / 21;    // 초성 인덱스
  const P = { F:FIRSTs[fi], M:MIDDLEs[mi], L:LASTs[li] }
  
  const DM  = DISassembleD_MIDDLE[ P.M ];  // 복합 중성 분해 (ex :  ㅢ => ㅡㅣ )
  const DL  = DISassembleD_LAST[ P.L ];  // 복합 종성 분해 (ex :  ㅆ => ㅅㅅ )
  return [ P.F, DM || P.M, DL || P.L ]
}

const isKorean = (v)=>{
  if( !v ) return false;
  let c = v.charCodeAt(0);
  return (c >= R.S  && c <= R.E ) || (c >= SR.S && c <= SR.E) || (c >= BR.S && c <= BR.E);
}

module.exports = {
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  R, SR, BR,
  assembleD_MIDDLE, DISassembleD_MIDDLE,
  assembleD_LAST,   DISassembleD_LAST,
  assemble, disassemble,
  isKorean, 
}