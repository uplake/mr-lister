
import {
  isInt,
  consolidateRanges,
  consolidateAlphaRanges
} from './utils';

type ListStringOptions = {
  article?: string;
  comma?: string;
  delimiter?: string;
  andor?: string;
  conjunction?: string;
  separator?: string;
  minRangeDelta?: number;
}

type List = unknown[] & { needsSort?: boolean, needsUnique?: boolean };

function isString(value: unknown): value is string {
  return toString.call(value) === '[object String]'
}

export default function listString(list: List, options: ListStringOptions | string = {}) {
  let andor: string;

  if (isString(options)) {
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
  const minRangeDelta = options.minRangeDelta || 1;

  // is the list an array of numbers or string-versions of numbers?
  let isNumeric = list.every(isInt);
  let isAlpha = false;
  let arr: unknown[] | null = null;
  if (isNumeric) {
    let numberList = (Array.from(list) as (string|number)[]).map((a) => parseInt(a as string, 10))
    // is numeric range
    arr = consolidateRanges(
      numberList,
      '–',
      list,
      minRangeDelta
    );
  } else { // test if alphabetic range
    isAlpha = list.every((x) => /^[a-z]$/i.test(x as string));
    if (isAlpha) {
      arr = consolidateAlphaRanges(list);
    }
  }

  let delimiter;
  if (list.length > 2) {
    if (arr !== null) {
      if (arr.length > 2) {
        delimiter = comma;
      }
    } else {
      const complex = list.find((x) => /,/.test(x as string));
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
