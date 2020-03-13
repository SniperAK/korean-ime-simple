const FIRST    =  'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const MIDDLE   =  'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const LAST     =  'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const FIRSTs   =  FIRST.split('');
const MIDDLEs  =  MIDDLE.split('');
const LASTs    =  ['',...LAST.split('')];

const R   = {S:'가'.charCodeAt(0), E:'힣'.charCodeAt(0)};
const SR  = {S:'ㄱ'.charCodeAt(0), E:'ㅎ'.charCodeAt(0)};
const BR  = {S:'ㅏ'.charCodeAt(0), E:'ㅣ'.charCodeAt(0)};

const ASSAMBLED_MIDDLE  = { 'ㅗㅏ':'ㅘ', 'ㅗㅐ':'ㅙ', 'ㅗㅣ':'ㅚ', 'ㅜㅓ':'ㅝ', 'ㅜㅔ':'ㅞ', 'ㅜㅣ':'ㅟ', 'ㅡㅣ':'ㅢ' }; 
const ASSAMBLED_LAST    = { 'ㄱㅅ':'ㄳ', 'ㄴㅈ':'ㄵ', 'ㄴㅎ':'ㄶ', 'ㄹㄱ':'ㄺ', 'ㄹㅁ':'ㄻ', 'ㄹㅂ':'ㄼ', 'ㄹㅅ':'ㄽ', 'ㄹㅌ':'ㄾ', 'ㄹㅍ':'ㄿ', 'ㄹㅎ':'ㅀ', 'ㅂㅅ':'ㅄ' };
const DISASSAMBLED_LAST = { 'ㄳ':['ㄱ','ㅅ'],'ㄵ':['ㄴ','ㅈ'],'ㄶ':['ㄴ','ㅎ'],'ㄺ':['ㄹ','ㄱ'],'ㄻ':['ㄹ','ㅁ'],'ㄼ':['ㄹ','ㅂ'],'ㄽ':['ㄹ','ㅅ'],'ㄾ':['ㄹ','ㅌ'],'ㄿ':['ㄹ','ㅍ'],'ㅀ':['ㄹ','ㅎ'],'ㅄ':['ㅂ','ㅅ']};

const Mix = (first,middle,last)=>{
  let li = LAST.indexOf( last ); 
  return String.fromCharCode( 
    R.S + 
    (21 * 28 * FIRST.indexOf( first )) + 
    (28 * MIDDLE.indexOf( middle )) + 
    (li >= 0 ? li + 1 : li < 0 ? 0 : li) 
  ); 
}

module.exports = function(v = '', k = ''){
  const keyCode = k.charCodeAt(0);
  // 0. 입력된 키가 한글 자판이 아닐때 이어 붙여서 리턴.
  if( !(keyCode < SR.S || keyCode > SR.E) &&  !(keyCode < BR.S || keyCode > BR.E) ) return (v || '') + k;

  const PV = (v || '')[v.length -1];
  if( !PV ) return k;     // 앞에 입력된 문자가 없을때 입력된 키를 리턴

  const PC = PV.charCodeAt(0);                          // [P]rev[C]ode

  const li =    (PC - R.S) % 28;                        // 종성 인덱스
  const mi =  (((PC - R.S) - li) / 28 ) % 21;           // 중성 인덱스
  const fi = ((((PC - R.S) - li) / 28 ) - mi ) / 21;    // 초성 인덱스
  const P = { F:FIRSTs[fi], M:MIDDLEs[mi], L:LASTs[li] }
  
  const CM        = ASSAMBLED_MIDDLE[ P.M + k ];     // 복합 중성 (ex : ㅡ + ㅣ => ㅢ )
  const CL        = ASSAMBLED_LAST[ P.L + k ];       // 복합 종성 (ex : ㅅ + ㅅ => ㅆ ) 
  const [P1, P2]  = DISASSAMBLED_LAST[ P.L ] || [];  // 복합 종성 분해 (ex :  ㅆ => ㅅㅅ )

  const _v = v.substring(0, v.length - 1);         // 이전값에서 마지막 문자열을 제외한 합성 전 문자열

  if( keyCode >= BR.S && keyCode <= BR.E ){                   // 1. 입력된 키가 모음이면서
    if( FIRST.indexOf(PV) > -1 ) {                            // 1.1. 이전 문자열이 초성으로 사용 가능한 글자일 경우
      return _v + Mix(PV, k);                                 // > 이전 글자와 입력된 키를 합침
    }
    else if( PC >= R.S && PC <= R.E ) {                       // 1.2. 이전 문자열이 한글이고, 
      if( li != 0 ) {                                         // 1.2.1. 이면서 받침이 있는 경우
        if( FIRST.indexOf( P.L ) > -1 ){                      // 1.2.1.1. 이전 글자의 받침이 초성으로 사용이 가능한 경우 
          return _v + Mix( P.F, P.M ) + Mix( P.L, k );        // > 이전 글자의 받침을 초성으로하여 새로운 문자로 합성
        }
        else if( P1 && P2 ){                                  // 1.2.1.2. 이전 글자의 받침이 복합 받침일 경우 두번째 받침을 추출.  
          return _v + Mix( P.F, P.M, P1 ) + Mix( P2, k );     // > 이전 글자의 받침 중 두번째 받침을 추출하여 새로운 문자로 합성
        }
      }
      else if( CM ){                                          // 1.2.2. 이전 문자열이 받침이 없으나, 이전 글자의 모음과, 입력된 키가 조합되어 복합 모음일 경우 
        return _v + Mix( P.F, CM );                           // > 이전 글자의 모음에 입력된 키를 조합하여 복합 모음을 
      }
    }
  }
  else if( PC >= R.S && PC <= R.E ){                 // 2. 입력된 키가 자음이고, 이전 문자열이 완성된 한글일때 
    if( li == 0 && LAST.indexOf( k ) > -1 ) {          // 2.1. 이전 글자에 받침( 종성 ) 이 없고, 입력된 키가 종성으로 사용이 가능할때
      return _v + Mix( P.F, P.M, k );                // > 이전 글자의 초성과 중성에 입력된 키를 종성으로 새로운 문자열 합성 
    }
    if( li > 0 && CL ) {                             // 2.2. 이전 글자에 받침( 종성 ) 이 있고, 입력된 키와 이전 글자의 받침으로 복합 종성으로 사용이 가능할때
      return _v + Mix( P.F, P.M, CL )                // > 이전 글자의 초성과 중성에, 종성과 입력된 키를 복합 종성으로 변환하여 새로운 문자열 합성
    }
  }

  return (v || '') + k;
}