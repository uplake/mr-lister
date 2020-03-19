
const {
  isInt,
  consolidateRanges,
  consolidateAlphaRanges
} = require('./utils');


function listString(list, options = {}) {
  let andor;

  if (toString.call(options) === '[object String]') {
    // compatability with old-style fn call
    andor = options;
    let [ ,, article, comma ] = arguments;
    options = { article, comma };
  } else {
    andor = options.andor || options.conjunction || 'and';
  }

  const andOrProvided = Boolean(andor);

  const { article } = options;

  const comma = options.comma || options.separator || ', ';

  let isRange = list.every(isInt);
  let arr;
  if (isRange) {
    // is numeric range
    arr = consolidateRanges(
      Array.from(list).map((a) => parseInt(a, 10)),
      '–',
      list
    );
  } else { // test if alphabetic range
    isRange = list.every((x) => /^[a-z]$/i.test(x));
    if (isRange) {
      arr = consolidateAlphaRanges(list);
    }
  }

  let delimiter;
  if (list.length > 2) {
    if (isRange) {
      if (arr.length > 2) {
        delimiter = comma;
      }
    } else {
      const complex = list.find((x) => /,/.test(x));
      delimiter = complex ? comma.replace(/,/, ';') : comma;
    }
  }

  if (!delimiter) {
    delimiter = andOrProvided ? andor : '';
    delimiter = delimiter.replace(/^(?![,.;:\s])/, ' ').replace(/[^,.;:\s]$/, '$& ');
  }

  if (!arr) {
    arr = list.slice();
  }

  // add articles
  if (article) {
    arr = arr.map((item) => `${article} ${item}`);
  }

  if (andOrProvided && (arr.length > 2)) {
    arr.push(`${andor} ${arr.pop()}`);
  }
  return arr.join(delimiter);
}

module.exports = listString;
