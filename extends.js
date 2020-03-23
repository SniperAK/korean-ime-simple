const {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSAMBLED_MIDDLE, DISASSAMBLED_MIDDLE,
  ASSAMBLED_LAST,   DISASSAMBLED_LAST,
  assamble, disassamble,
  isKorean
} = require('./common');

const decrease = (v) => {
  let [f,m,l] = disassamble(v);
  if( l ) l = l.substring(0, l.length - 1);
  else if( m ) m = m.substring(0, m.length - 1);
  else if( f ) f = f.substring(0, f.length - 1);
  return assamble( f, m, l === '' ? undefined : l);
}

module.exports = {
  R, SR, BR,
  FIRST,  MIDDLE,  LAST,
  FIRSTs, MIDDLEs, LASTs,
  ASSAMBLED_MIDDLE, DISASSAMBLED_MIDDLE,
  ASSAMBLED_LAST,   DISASSAMBLED_LAST,
  assamble, disassamble,
  isKorean,
  decrease,
}