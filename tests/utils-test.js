let test = require('tape-catch');
let { expandAlphaRange } = require('../');

test('expandAlphaRange expands alpha range', (assert) => {
  assert.deepEqual(
    expandAlphaRange(`a`, `d`),
    [ 'a', 'b', 'c', 'd' ]
  );

  assert.deepEqual(
    expandAlphaRange(`B`, `C`),
    [ 'B', 'C' ]
  );

  assert.deepEqual(
    expandAlphaRange(`b`, `X`),
    [ 'X', 'Y', 'Z', 'a', 'b' ]
  );

  assert.end();
});
