
function stringList(str, { sort = true, unique = true } = {}) {
  let groups = [];
  // allow dash, en-dash, or em-dash between ranges
  // allow a dot after the first number in a range
  let pat = /(\d+)(?:[.]?\s*[-\u2013\u2014]\s*(\d+))?/g;
  let res;
  while ((res = pat.exec(str))) {
    let [ , num, endNum = num ] = res;
    if (endNum.length < num.length) {
      // if we have a range such as 110-15, then copy
      // the leading chars from the first num
      endNum = `${num.slice(0, -endNum.length)}${endNum}`;
    }

    num = parseInt(num, 10);
    endNum = parseInt(endNum, 10);

    if (endNum < num) {
      [ endNum, num ] = [ num, endNum ];
    }

    groups.push(Array(endNum - num + 1).fill(num).map((n, i) => n + i));
  }

  // sort range groups by their start value
  let sortedGroups = groups.slice().sort(([ a ], [ b ]) => a - b);

  let needsSort = false;
  let needsUnique = false;
  for (const [ i, range ] of sortedGroups.slice(1).entries()) {
    let prev = sortedGroups[i][sortedGroups[i].length - 1];
    let curr = range[0];
    needsSort = needsSort || curr < prev;
    needsUnique = needsUnique || curr <= prev;
    if (needsSort && needsUnique) {
      break;
    }
  }
  let numbers = [].concat(...(sort ? sortedGroups : groups));

  if (groups.length > 1) {

    if (unique && needsUnique) {
      needsUnique = false;
      numbers = [ ...new Set(numbers) ];
    }
    if (sort && needsSort) {
      needsSort = false;
      numbers.sort((a, b) => a - b);
    }
  }

  return Object.defineProperties(numbers, {
    needsSort: { value: needsSort, writable: false, enumerable: false },
    needsUnique: { value: needsUnique, writable: false, enumerable: false }
  });
}

module.exports = stringList;
