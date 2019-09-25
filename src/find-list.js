const re = require('block-re');
const stringList = require('./string-list');
const listString = require('./list-string');

// match conjunctions that we often see inside number ranges, e.g.,
// 'claims 1, 4, and 5'; 'claims 5 to 10'; 'paragraphs 17 and/or 35'
const conjunctions = /(?:and\s*\/\s*or|&|and|or|to|thru|through)/i;

function findList(text, { max = 999 } = {}) {
  // match numbers, but exclude ordinals (e.g., 1st, 2nd, 3rd, 4th...)
  const num = re()`\d{1,${String(max).length}}(?!\w)`;

  // match a whole number-range substring, e.g., '1, 3-4, and 5'
  const numberRange = re('gi')`(?:
    // match a solo 1-3 digit number or a range of 1-3 digit numbers
    (?: ${num} ) (?: \s*[-–]\s* ${num} )?
    // match trailing punctuation and a conjunction if there are more numbers thereafter
    (?: [\s,;]* ${conjunctions}? \s* (?= ${num}) )?
  )+`;

  // we will fix ranges that are preceded by a range label (singular or plural)
  const rangeToFind = re('gi')`
    \b (?<label>
        // allow a label made of non-digit word chars
        [^\d\W]+
        // with an optional '(s)'
        (?:[(]s[)])?
        // and an optional dot
        [.]?
      )?
      \s*
      (?<range>${numberRange})
  `;
  let res;
  let matches = [];
  while ((res = rangeToFind.exec(text))) {
    let { index, 0: match, groups: { range, label } } = res;
    range = range.replace(/\s*(?:to|thru|through)\s*/gi, '-');
    let list = stringList(range);
    matches.push({ index, match, label, list });
  }
  return matches;
}

module.exports = {
  findList
};
