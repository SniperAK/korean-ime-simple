const {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE,
  ASSEMBLED_LAST,   DISASSEMBLED_LAST,
  assemble, disassemble,
  isKorean
} = require('./libs/common');

const decrease = (v) => {
  let [f,m,l] = disassemble(v);
  if( l ) l = l.substring(0, l.length - 1);
  else if( m ) m = m.substring(0, m.length - 1);
  else if( f ) f = f.substring(0, f.length - 1);
  return assemble( f, m, l === '' ? undefined : l);
}

module.exports = {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSEMBLED_MIDDLE, DISASSEMBLED_MIDDLE,
  ASSEMBLED_LAST,   DISASSEMBLED_LAST,
  assemble, disassemble,
  isKorean,
  decrease,
}