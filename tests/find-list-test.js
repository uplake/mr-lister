let test = require('tape-catch');
let { findList } = require('../src/find-list');

test('findList list strings', (assert) => {
  assert.deepEqual(
    findList(`Figures 1 thru 3 are naughty. Figs. 5 and 6 are nice.`, { max: 999 }),
    [ {
      index: 0,
      label: `Figures`,
      list: [ 1, 2, 3 ],
      match: `Figures 1 thru 3`
    }, {
      index: 30,
      label: `Figs.`,
      list: [ 5, 6 ],
      match: `Figs. 5 and 6`
    } ]
  );

  assert.deepEqual(
    findList(`Items 1, 4, 5 to 7, and 2 are confusing.`),
    [ {
      index: 0,
      label: 'Items',
      list: [ 1, 2, 4, 5, 6, 7 ],
      match: 'Items 1, 4, 5 to 7, and 2'
    } ]
  );

  assert.end();
});
