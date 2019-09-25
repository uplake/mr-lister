/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
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

function consolidateRanges(inputArray, delimiter = '–') {
  const arr = unique(inputArray).sort((a, b) => a - b);
  const rangeEnds = [];
  const rangeBegs = [];
  arr.forEach((num, i) => {
    if (num !== (arr[i - 1] + 1)) {
      rangeBegs.push(num);
    }
    if (num !== (arr[i + 1] - 1)) {
      rangeEnds.push(num);
    }
  });
  return rangeBegs.map((start, i) => {
    const end = rangeEnds[i];
    if (start === end) {
      return start;
    }
    return `${start}${delimiter}${end}`;
  });
}

function consolidateAlphaRanges(inputArray, delimiter = '–') {
  const arr = unique(inputArray).sort();
  const rangeEnds = [];
  const rangeBegs = [];
  arr.forEach((ltr, i) => {
    if (ltr.charCodeAt() !== (__guard__(arr[i - 1], (x) => x.charCodeAt()) + 1)) {
      rangeBegs.push(ltr);
    }
    if (ltr.charCodeAt() !== (__guard__(arr[i + 1], (x1) => x1.charCodeAt()) - 1)) {
      rangeEnds.push(ltr);
    }
  });

  return rangeBegs.map((start, i) => {
    const end = rangeEnds[i];
    if (start === end) {
      return start;
    } else {
      return `${start}${delimiter}${end}`;
    }
  });
}

const every = function(arr, testFn) { // slightly faster than [].every
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!testFn(item, i)) {
      return false;
    }
  }
  return true;
};

const any = function(arr, testFn) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (testFn(item, i)) {
      return true;
    }
  }
  return false;
};


module.exports = {
  isNumber,
  isInt,
  unique,
  every,
  any,
  consolidateRanges,
  consolidateAlphaRanges
};


function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
