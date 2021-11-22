const {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE,
  ASSEMBLED_LAST,   DISASSEMBLED_LAST,
  assemble, isKorean
} = require('./common');

module.exports = (v = '', k = '')=>{
  // 0. 입력된 키가 한글 자판이 아닐때 이어 붙여서 리턴.
  // if( !isKorean(k) ) return (v || '') + k;
  
  const KC = k.charCodeAt(0);
  if( !(KC < SR.S || KC > SR.E) &&  !(KC < BR.S || KC > BR.E) ) return v + k;
  
  const PV = v[v.length -1];
  if( !PV ) return k;     // 앞에 입력된 문자가 없을때 입력된 키를 리턴

  const PC = PV.charCodeAt(0);                          // [P]rev[C]ode

  const LI =    (PC - R.S) % 28;                        // 종성 인덱스
  const MI =  (((PC - R.S) - LI) / 28 ) % 21;           // 중성 인덱스
  const FI = ((((PC - R.S) - LI) / 28 ) - MI ) / 21;    // 초성 인덱스
  const P = { F:FIRSTs[FI], M:MIDDLEs[MI], L:LASTs[LI] };
  
  const _v = v.substring(0, v.length - 1);         // 이전값에서 마지막 문자열을 제외한 합성 전 문자열

  // console.log( PV, k );
  if( MIDDLE.indexOf(k) > -1 ){                                   // 1. 입력된 키가 모음이면서
    if( FIRST.indexOf(PV) > -1 ){                                 // 1.1. 이전 문자열이 초성으로 사용 가능한 글자일 경우
      return _v + assemble(PV, k);                                // > 이전 글자와 입력된 키를 합성
    }
    else if( ASSEMBLED_MIDDLE[PV + k] ){                          // 1.2. 이전 문자열이 중성이고, 입력된 문자열과 결합이 가능한 경우 예 ) ㅡ + ㅣ = ㅢ
      return _v + ASSEMBLED_MIDDLE[PV + k];                       // > 이전 중성과 입력된 중성을 합성
    }                
    else if( PC >= R.S && PC <= R.E ){                            // 1.3. 이전 문자열이 한글이고, 
      if( LI != 0 ){                                              // 1.3.1. 받침이 있는 경우
        if( FIRST.indexOf( P.L ) > -1 ){                          // 1.3.1.1. 이전 글자의 받침이 초성으로 사용이 가능한 경우 
          return _v + assemble( P.F, P.M ) + assemble( P.L, k );  // > 이전 글자의 받침을 초성으로하여 새로운 문자로 합성
        }
        else if( DISASSEMBLED_LAST[ P.L ] ){                        // 1.3.1.3. 이전 글자의 받침이 복합 받침일 경우 두번째 받침을 추출.  
          const [P1, P2]  = DISASSEMBLED_LAST[ P.L ] || [];         // 복합 종성 분해 (ex :  ㅆ => ㅅㅅ )
          return _v + assemble( P.F, P.M, P1 ) + assemble( P2, k ); // > 이전 글자의 받침 중 두번째 받침을 추출하여 새로운 문자로 합성
        }
      }
      else if( ASSEMBLED_MIDDLE[ P.M + k ] ){                       // 1.3.2. 이전 문자열이 받침이 없으나, 이전 글자의 모음과, 입력된 키가 조합되어 복합 모음일 경우 
        return _v + assemble( P.F, ASSEMBLED_MIDDLE[ P.M + k ] );   // > 이전 글자의 모음에 입력된 키를 조합하여 복합 모음을 
      }
    }
  }
  else if( PC >= R.S && PC <= R.E ){                               // 2. 입력된 키가 자음이고, 이전 문자열이 완성된 한글일때 
    if( LI == 0 && LAST.indexOf( k ) > -1 ){                       // 2.1. 이전 글자에 받침( 종성 ) 이 없고, 입력된 키가 종성으로 사용이 가능할때
      // console.log('2.1', _v, P.F, P.M, k, assemble( P.F, P.M, k ));
      return _v + assemble( P.F, P.M, k );                         // > 이전 글자의 초성과 중성에 입력된 키를 종성으로 새로운 문자열 합성 
    }
    if( LI > 0 && ASSEMBLED_LAST[ P.L + k ] ){                     // 2.2. 이전 글자에 받침( 종성 ) 이 있고, 입력된 키와 이전 글자의 받침으로 복합 종성으로 사용이 가능할때
      return _v + assemble( P.F, P.M, ASSEMBLED_LAST[ P.L + k ] ); // > 이전 글자의 초성과 중성에, 종성과 입력된 키를 복합 종성으로 변환하여 새로운 문자열 합성
    }
  }

  return v + k;
}