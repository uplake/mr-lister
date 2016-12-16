let test = require('tape-catch');
let stringList = require('../lib/stringList');

test('stringList strings lists', (assert) => {
  assert.deepEqual(stringList('1'), [1]);
  assert.deepEqual(stringList('1-3'), [1, 2, 3], 'simple range');
  assert.deepEqual(stringList('1 - 3'), [1, 2, 3], 'spaces around dash');
  assert.deepEqual(stringList('1. - 3.'), [1, 2, 3], 'dots');
  assert.deepEqual(stringList('1–3'), [1, 2, 3], 'en dash');
  assert.deepEqual(stringList('1—3'), [1, 2, 3], 'em dash');
  assert.end();
});
