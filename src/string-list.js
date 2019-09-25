
function stringList(str, { sort = true, unique = true } = {}) {
  let numbers = [];
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

    while (num <= endNum) {
      numbers.push(num);
      num++;
    }
    if (unique) {
      numbers = [ ...new Set(numbers) ];
    }
  }

  if (sort) {
    numbers.sort((a, b) => a - b);
  }

  return numbers;
}

module.exports = stringList;
