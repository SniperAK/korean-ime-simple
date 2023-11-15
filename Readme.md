# Korean IME Simple 1.2.6
> Korean Characters made by King Sejong the Great
> 
> Assemble Korean Input Method Editor. 
> 
> Easy to use and light.
> 
> Assemble Korean character  sequentially.

# Versions History
- 1.0.0 Release.
- 1.1.0 Support extended functions and consts via [extends](##EXTENDS)
- 1.1.1 Fixed mistype spelling as assamble to assemble.
- 1.2.1
  - Improve code struct
  - Add Eng to Kor
- 1.2.2 Minor buf fix
- 1.2.6 typescript support

## Installation

> Install using npm

```
npm install korean-ime-simple
```

## Using
> Only support one method for assemble previus string with current inputted string. 

```
import KoreanIme from 'Korean-ime-simple'

...

let value = KoreanIme( value, input );

```

## Test

```
npm run test
```

> ```
> Test success
> ```

## Principle

> Korean-ime-simple`s principle is simpple and not complex.

- Assembled Korenn Unicode Rull
  - All Korean element character located in sequentially. 
  - All of Korean is combined three method and that character is two of parts that called Jaeum, Moeum
  - All Assembled Korean has rull that 3-dimensions for each syllable.
  - Can Disassambling assembled Korean string to elements.
  - All syllables have own combination. ( code using named Assembled )
    - First Syllables
      Normal Characters in Korean keyboard
      ```
      ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ
      ```
      Possabled to assambling combination for First.
      ```
      ㄲㄸㅃㅆㅉ
      ```
    - Middle Syllable
      Normal Characters in Korean keyboard
      ```
      ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ
      ```
      Combination
      ```
      ㅘㅙㅚㅝㅞㅟㅠㅢ
      ``` 
    - Assembled Last Syllable
      Normal Characters in Korean keyboard 
      ```
      ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ
      ```
      Combination
      ```
      ㄲㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄㅆ
      ```
- IME
  - Input character is only support single element.
  - Check inputted character is Korean element.
  - Check previus last character is Korean.
  - Check previus character is element string or assembled or combinated element.
  - Merger to previus string and inputted character.
  - Return fully assembled string.

### 3 Dimension Matrix of Korean

- first axis called Cho-Sung (초성)
  > ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ
- second axis called Jung-Sung (중성)
  > ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ
- third axis called Joing-Sung (종성)
  > ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ

### first layer of 2-dimension map

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 가  | 까  | 나  | 따  | ... | 파  | 하  |
| ㅐ  | 개  | 깨  | 내  | 때  | ... | 패  | 해  |
| ㅑ  | 갸  | 꺄  | 냐  | 땨  | ... | 퍄  | 햐  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 기  | 끼  | 니  | 띠  | ... | 피  | 히  |

### second layer of 2-dimension map

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 각  | 깍  | 낙  | 딱  | ... | 팍  | 학  |
| ㅐ  | 객  | 깩  | 낵  | 땍  | ... | 팩  | 핵  |
| ㅑ  | 갹  | 꺅  | 냑  | 댝  | ... | 퍅  | 햑  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 긱  | 끽  | 닉  | 띡  | ... | 픽  | 힉  |

### last layer of 2-dimension map

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 갛  | 깧  | 낳  | 땋  | ... | 팧  | 핳  |
| ㅐ  | 갷  | 꺃  | 냏  | 땧  | ... | 팩  | 햏  |
| ㅑ  | 갛  | 꺟  | 냫  | 닿  | ... | 퍅  | 핳  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 깋  | 낗  | 닣  | 띻  | ... | 핗  | 힣  |

## Extends

- Const
  - R, SR, BR
  - FIRST, MIDDLE, LAST
  - FIRSTs, MIDDLEs, LASTs
  - ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE
  - ASSEMBLED_LAST,   DISASSEMBLED_LAST
- Utils
  - assemble(first, middle || asambledMiddle, last || assembledLast )
  - disassemble( a syllable )
  - isKorean( a syllable )
  - decrease( a syllable )

# 가벼운 한글 IME 1.0.0

## 설치

> NPM 을 이용하여 설치 합니다.

```
npm install korean-ime-simple
```

## 테스트

```
npm run test
```

> ```
> Test success
> ```

## 사용법

> 문자열 조합을 위하여 이전 문자열에 입력된 문자열을 조합하는 하나의 메소드만이 지원됩니다.

```
import KoreanIme from 'Korean-ime-simple'

...

let value = KoreanIme( value, input );

```

## 원리

> Korean-ime-simple의 기본 원리.

- Unicode 한글 문자열 원리

  - Unicode 상의 모든 한글 문자열은 순서에 맞게 나열 되어있다.
  - 모든 한글 문자열은 세가지 방법으로 자음과 모음으로 불리우는 요소들의 결합이다.
  - 모든 한글 문자열은 3 차원의 조합 방법을 이용하여 조합된다.
  - 완성된 문자열은 기초 문자열로 분해가 가능하다.
  - 모든 음절은 그 위치에 따라 조합 방법이 정해져있다.
    - 초성
      일반적인 한글 키보드에서 지원하는 초성 입력
      ```
      ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ
      ```
      조합이 가능한 초성
      ```
      ㄲㄸㅃㅆㅉ
      ```
    - 중성
      일반적인 한글 키보드에서 지원하는 중성 입력
      ```
      ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ
      ```
      조합이 가능한 중성
      ```
      ㅘㅙㅚㅝㅞㅟㅠㅢ
      ```
    - 종성
      Normal Characters in Korean keyboard
      ```
      ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ
      ```
      Combination
      ```
      ㄲㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄㅆ
      ```

- IME 동작
  - 입력되는 문자는 오직 단일 요소여야한다.
  - 입력된 문자가 한글인지 판단한다.
  - 이전에 입력된 문자열의 마지막 문자가 한글로 합성이 가능한 문자열인지 판단.
  - 마지막 문자가 개별 요소인지, 복합된 요소인지, 판단
  - 마지막 문자열의 요소와 입력된 글자를 합친다.
  - 완성된 문자열을 반환한다.

### 3 차원 구성의 한글 문자 조합

- 첫번째 축 초성
  > ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ
- 두번째 축 중성
  > ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ
- 세번째 축 종성
  > ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ

### 첫번째 2차원 구성 ( 받침 없는 경우 )

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 가  | 까  | 나  | 따  | ... | 파  | 하  |
| ㅐ  | 개  | 깨  | 내  | 때  | ... | 패  | 해  |
| ㅑ  | 갸  | 꺄  | 냐  | 땨  | ... | 퍄  | 햐  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 기  | 끼  | 니  | 띠  | ... | 피  | 히  |

### 두번째 2차원 구성 ( ㄱ 받침 )

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 각  | 깍  | 낙  | 딱  | ... | 팍  | 학  |
| ㅐ  | 객  | 깩  | 낵  | 땍  | ... | 팩  | 핵  |
| ㅑ  | 갹  | 꺅  | 냑  | 댝  | ... | 퍅  | 햑  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 긱  | 끽  | 닉  | 띡  | ... | 픽  | 힉  |

### 마지막 2차원 구성 ( ㅎ 받침 )

|     | ㄱ  | ㄲ  | ㄴ  | ㄸ  | ... | ㅍ  | ㅎ  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ㅏ  | 갛  | 깧  | 낳  | 땋  | ... | 팧  | 핳  |
| ㅐ  | 갷  | 꺃  | 냏  | 땧  | ... | 팩  | 햏  |
| ㅑ  | 갛  | 꺟  | 냫  | 닿  | ... | 퍅  | 핳  |
| ... | ... | ... | ... | ... | ... | ... | ... |
| ㅣ  | 깋  | 낗  | 닣  | 띻  | ... | 핗  | 힣  |
