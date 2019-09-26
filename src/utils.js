/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
const isInt = (n) => !isNaN(parseInt(n, 10)) && (parseFloat(n, 10) === parseInt(n, 10));

function unique(arr) {
  return [ ...new Set(arr) ];
}

function consolidate(arr, delimiter, getVal) {
  const rangeBegs = [];
  const rangeEnds = [];
  for (let index = 0; index < arr.length; index++) {
    let curr = getVal(arr[index]);
    let prev = getVal(arr[index - 1]);
    let next = getVal(arr[index + 1]);

    if (curr !== prev + 1) {
      rangeBegs.push(arr[index]);
    }
    if (curr !== next - 1) {
      rangeEnds.push(arr[index]);
    }
  }
  return rangeBegs.map((start, i) => {
    const end = rangeEnds[i];
    if (start === end) {
      return start;
    }
    return `${start}${delimiter}${end}`;
  });
}

function consolidateRanges(inputArray, delimiter = '–') {
  return consolidate(
    unique(inputArray).sort((a, b) => a - b),
    delimiter,
    (x) => x
  );
}

function consolidateAlphaRanges(inputArray, delimiter = '–') {
  return consolidate(
    unique(inputArray).sort(),
    delimiter,
    (x) => x ? x.charCodeAt() : NaN);
}

function expandAlphaRange(fromChar, toChar) {
  let fromCode = fromChar.charCodeAt();
  let toCode = toChar.charCodeAt();
  if (fromCode > toCode) {
    [ toCode, fromCode ] = [ fromCode, toCode ];
  }
  return [ ...Array(toCode - fromCode + 1).keys() ]
    .map((ii) => String.fromCharCode(fromCode + ii))
    .filter((char) => /[a-z]/i.test(char));
}

module.exports = {
  isNumber,
  isInt,
  unique,
  consolidateRanges,
  consolidateAlphaRanges,
  expandAlphaRange
};
