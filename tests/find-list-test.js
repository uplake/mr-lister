let test = require('tape-catch');
let { findList } = require('../src/find-list');

test('findList list strings', (assert) => {
  assert.deepEqual(
    findList(`Figures 1 thru 3 are naughty. Figs. 5 and 6 are nice.`, { max: 999 }),
    [ {
      index: 0,
      items: [ '1', '3' ],
      label: `Figures`,
      list: [ 1, 2, 3 ],
      match: `Figures 1 thru 3`
    }, {
      index: 30,
      items: [ '5', '6' ],
      label: `Figs.`,
      list: [ 5, 6 ],
      match: `Figs. 5 and 6`
    } ]
  );

  assert.deepEqual(
    findList(`Items 1, 4, 5 to 7, and 2 are confusing.`),
    [ {
      index: 0,
      items: [ '1', '4', '5', '7', '2' ],
      label: 'Items',
      list: [ 1, 2, 4, 5, 6, 7 ],
      match: 'Items 1, 4, 5 to 7, and 2'
    } ]
  );

  assert.deepEqual(
    findList(`Thingies 1A, 4, 5A-C, and 2 are confusing.`, {
      item: /\d(?:[A-Z](?:[-–][A-Z])?)?\b/g
    }),
    [ {
      index: 0,
      items: [ '1A', '4', '5A-C', '2' ],
      label: 'Thingies',
      list: [ 1, 2, 4, 5 ],
      match: 'Thingies 1A, 4, 5A-C, and 2'
    } ]
  );

  assert.deepEqual(
    findList(`Don, Mitch, and Bill belong in jail.`, {
      item: /\b[A-Z][a-z]+\b/g
    }),
    [ {
      index: 0,
      items: [ 'Don', 'Mitch', 'Bill' ],
      label: '',
      list: [],
      match: 'Don, Mitch, and Bill'
    } ]
  );

  assert.end();
});
