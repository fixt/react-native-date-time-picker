'use strict';

const makeRange = (min, max, step, twice) => {
  const range = [];
  var entry = "";

  min = min || 0;
  max = max || 9999;
  step = step || 1;
  
  for(min; min <= max; min += step) {
    entry = min + "";
    if (twice) {
      entry = entry.length === 1 ? "0" + entry : entry;
    }
    range.push(entry);
  }

  return range;
}

export default makeRange;
