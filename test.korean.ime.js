const {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE,
  ASSEMBLED_LAST,   DISASSEMBLED_LAST,
  assemble, isKorean
} = require('./common');

function destructiveKorean( str ) {
  let first, middle, last;

  let cnt = str.length;
  let chars = [];
  let cCode;

  for (let i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);

    if (cCode == 32) { 
      chars.push(str.charAt(i));
      continue; 
    }

    // case of not korean
    if (cCode < R.S || cCode > R.E) {
        chars.push(str.charAt(i));
        continue;
    }

    cCode  = str.charCodeAt(i) - R.S;

    last = cCode % 28; // get element of last
    middle = ((cCode - last) / 28 ) % 21 // get element of middle
    first  = (((cCode - last) / 28 ) - middle ) / 21 // get element of first

    chars.push(
      FIRSTs[first], 
      ...DISASSEMBLED_MIDDLE[ MIDDLEs[middle] ] ? DISASSEMBLED_MIDDLE[ MIDDLEs[middle] ] : [MIDDLEs[middle]],
    );
    if (LASTs[last] !== '') { 
      chars.push(
        ...DISASSEMBLED_LAST[ LASTs[last] ] ? DISASSEMBLED_LAST[ LASTs[last] ] : [LASTs[last]],
      );
    }
  }

  return chars;
}

const KoreanIME = require('./index');
const TestCases = [
  '잡다한의학사전',
  '괇똷',
  '동해물과 백두산이 마르고 닳도록 하느님이 보우 하사 우리 나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
  '1,2,4 아무노래나 일단 틀어 아무거나 신나는 걸로',
  '각기',
  '사쓰',
  '삿소리',
  '사서삼경 또는 사서오경은 유교의 핵심 경전 일곱 또는 아홉 권을 말한다. 사서는 《논어》, 《맹자》, 《대학》, 《중용》. 삼경은 《시경》, 《서경》, 《역경(주역)》을 말하고, 이에 《춘추경(춘추)》, 《예경(예기)》를 더하면 사서오경이 된다. 원래는 《악경(樂經)》을 포함하여 사서육경이라고도 하지만, 악경은 전해지지 않는다.[1]또, 사서오경에 송(춘추전국시대)대에 추가된 《주례(周禮)》,《의례(儀禮)》,《이아(爾雅)》,《효경(孝經)》의 네 권을 더하고, 앞에서 설명한 것처럼 중용과 대학은 예기의 한 부분이니 하나로 간주하고, 춘추를 주석 단 사람에 따라 춘추삼전(三傳)[2]으로 세면 9+4-2+2, 즉 십삼경이 된다. [3]삼경, 혹은 육경은 춘추전국시대또는 그 이전의 기록이나 작품들이고, 사서는 공자와 맹자의 문하[4] 에서 만들어진 책이고 그 중 대학과 중용은 송대 주희(주자)에 의해 크게 버프 를 받는다. 한편 삼경 중에서 시경이나 주역의 경우는 원전이 전해내려 오지만[5], 서경의 경우, 분서갱유의 피해를 입어, 후대의 전한대에 기록된 금문상서에 위진시기에 나온 위작인 위고문상서를 합친 가짜라는 점이 문제점으로 남아있고, 이걸 훈고하기 위해 후한 때 장난 아닌 노력이 들어갔다. 그렇기에 정말 골수 주자학파냐, 아니면 그 이전의 공맹에게도 돌아가는 유학정통파냐의 분기가 사서삼경에서 갈렸다...고는 하는데, 다 읽어봐야 원 분기를 하든 말든 하지(...)조선시대 천재의 기준. 사서삼경을 어려서 다 떼면 천재 소리를 들었다. 여기서 뗐다는 건 그걸 다 외워서 줄줄 얘기할 수 있다는 소리. 위인전을 보면 열살 이전에 다 떼었다는 인물들이 워낙 많아서 그런가보다 하지만 초등학생이 고등고시 과목을 마스터했다는 얘기다.이이의 《격몽요결》 중 제4장 독서장(讀書章)을 보면, 소학→대학/대학혹문→논어→맹자→중용→시경→예기→서경→역경→춘추 순으로 읽기를 권한다. 4서를 먼저 읽고 5경을 그 다음에 읽는 셈이다. 물론 어디까지나 조선시대의 학습기준이기에 현대인이 여기에 맞출 필요는 전혀 없고 오히려 한문문법에 입문하기엔 가장 뒤에 읽으라고 나와있는 춘추... 특히 춘추좌씨전이 역사를 서술한 서적인 만큼 가장 수월하다.'
];

const test = (string)=>{
  let elements = destructiveKorean( string );
  let value = elements.reduce((p,key) => {
    return KoreanIME( p, key );
  }, '');
  return {elements:elements.join(''),value, success:value == string};
}

const TestResult = TestCases.map(test);
const result = TestResult.filter(r=>r.success).length == TestCases.length;

console.log( 'Test' , result ? 'success' : 'failed' );
if( !result ){
  console.log( TestResult );
}
