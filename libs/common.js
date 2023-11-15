const FIRST    =  'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';                 // 초성
const MIDDLE   =  'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';             // 중성
const LAST     =  'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'; // 종성

const FIRSTs   =  FIRST.split('');
const MIDDLEs  =  MIDDLE.split('');
const LASTs    =  ['',...LAST.split('')];

const R   = {S:'가'.charCodeAt(0), E:'힣'.charCodeAt(0)};
const SR  = {S:'ㄱ'.charCodeAt(0), E:'ㅎ'.charCodeAt(0)};
const BR  = {S:'ㅏ'.charCodeAt(0), E:'ㅣ'.charCodeAt(0)};

const objectReverse = (obj)=>Object.entries(obj).reduce((p,[k,v])=>({...p, [v]:k}),{});

const ASSEMBLED_MIDDLE     = { 'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ','ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ'}; 
const DISASSEMBLED_MIDDLE  = objectReverse(ASSEMBLED_MIDDLE);
const ASSEMBLED_LAST       = { 'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ','ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ'};
const DISASSEMBLED_LAST    = objectReverse(ASSEMBLED_LAST);

const ENG_KOR = { q:'ㅂ',w:'ㅈ',e:'ㄷ',r:'ㄱ',t:'ㅅ',y:'ㅛ',u:'ㅕ',i:'ㅑ',o:'ㅐ',p:'ㅔ',a:'ㅁ',s:'ㄴ',d:'ㅇ',f:'ㄹ',g:'ㅎ',h:'ㅗ',j:'ㅓ',k:'ㅏ',l:'ㅣ',z:'ㅋ',x:'ㅌ',c:'ㅊ',v:'ㅍ',b:'ㅠ',n:'ㅜ',m:'ㅡ',Q:'ㅃ',W:'ㅉ',E:'ㄸ',R:'ㄲ',T:'ㅆ',O:'ㅒ',P:'ㅖ'}
const KOR_ENG = objectReverse(ENG_KOR);


const assemble = (first,middle,last)=>{
  if( first  && !middle ) return first;
  if( !first && middle ) return ASSEMBLED_MIDDLE[ middle ] || middle;
  if( !first && !middle && !last) return '';
  // console.log('assemble', first,middle, last );
  let li          = LAST.indexOf( ASSEMBLED_LAST[ last ] || last );
  return String.fromCharCode( 
    R.S + 
    (21 * 28 * FIRST.indexOf( first )) + 
    (28 * MIDDLE.indexOf( ASSEMBLED_MIDDLE[ middle ] ||  middle )) + 
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
  
  const DM  = DISASSEMBLED_MIDDLE[ P.M ];  // 복합 중성 분해 (ex :  ㅢ => ㅡㅣ )
  const DL  = DISASSEMBLED_LAST[ P.L ];  // 복합 종성 분해 (ex :  ㅆ => ㅅㅅ )
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
  ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE,
  ASSEMBLED_LAST,   DISASSEMBLED_LAST,
  assemble, disassemble,
  isKorean, 
  ENG_KOR, KOR_ENG
}