const { R, FIRSTs, MIDDLEs, LASTs, DISASSEMBLED_MIDDLE, DISASSEMBLED_LAST } = require('./common');

module.exports = function destructiveKorean( str ) {
  let first, middle, last;

  const cnt = str.length;
  const chars = [];
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
