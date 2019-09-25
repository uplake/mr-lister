let test = require('tape-catch');
let stringList = require('../src/string-list');

test('stringList strings lists', (assert) => {
  assert.deepEqual(stringList('1'), [ 1 ]);
  assert.deepEqual(stringList('1-3'), [ 1, 2, 3 ], 'simple range');
  assert.deepEqual(stringList('1 - 3'), [ 1, 2, 3 ], 'spaces around dash');
  assert.deepEqual(stringList('1. - 3.'), [ 1, 2, 3 ], 'dots');
  assert.deepEqual(stringList('1–3'), [ 1, 2, 3 ], 'en dash');
  assert.deepEqual(stringList('1—3'), [ 1, 2, 3 ], 'em dash');
  assert.end();
});


test('stringList strings lists with abbreviated endNums', (assert) => {
  assert.deepEqual(
    stringList('401-3'),
    [ 401, 402, 403 ]
  );
  assert.deepEqual(
    stringList('411-13'),
    [ 411, 412, 413 ]
  );
  assert.deepEqual(
    stringList('042-44'),
    [ 42, 43, 44 ]
  );
  assert.deepEqual(
    stringList('0142-44'),
    [ 142, 143, 144 ]
  );
  assert.end();
});

