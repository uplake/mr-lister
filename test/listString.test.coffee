listString = require '../lib/listString'

exports.ListStringTest =
   'test can list arbitrary items': (test) ->
      test.equal listString(['apples', 'oranges']), 'apples and oranges'
      test.equal listString(['apples', 'oranges', 'monkeys']), 'apples, oranges, and monkeys'
      test.equal listString([
         'apples, oranges, and monkeys'
         'peaches'
         'bananas'
         ]), 'apples, oranges, and monkeys; peaches; and bananas'
      test.done()

   'test can list consecutive integers': (test) ->
      result = listString [1..10]
      test.equal(result, '1–10')
      test.equal listString([-5..5]), '-5–5'
      test.equal listString(['1.0', 2, '3.0']), '1–3'
      test.equal listString(['1.0', 2, 3]), '1–3'
      test.equal listString(['1.0', '2.00000000', 9/3]), '1–3'
      test.equal listString(['1.0', 2, 3.1]), '1.0, 2, and 3.1'
      test.done()

   'test can list consecutive letters': (test) ->
      test.equal listString(String.fromCharCode(x) for x in [65..75]), 'A–K'
      test.equal listString(String.fromCharCode(x) for x in [97..107]), 'a–k'
      test.done()

   'test can list non-consecutive integers': (test) ->
      test.equal listString([1,2,3,5,6,7]), '1–3 and 5–7'
      test.equal listString([3,2,6,5,6,1,7]), '1–3 and 5–7'
      test.equal listString([1,2,3,5,6,7,10]), '1–3, 5–7, and 10'
      test.done()

   'test can list non-consecutive letters': (test) ->
      test.equal listString([
         'a'
         'b'
         'd'
         'e'
         ]), 'a–b and d–e'
      test.equal listString([
         'a'
         'b'
         'd'
         'e'
         'D'
         'A'
         'C'
         ]), 'A, C–D, a–b, and d–e'
      test.done()

   'test can pollute Array prototype': (test) ->
      pollute = require('../lib/index').pollute
      pollute()
      test.equal ['apples', 'oranges'].listString(), 'apples and oranges'
      test.equal [1,2,3,5,6,7].listString(), '1–3 and 5–7'
      test.done()

unless module.parent?
   nodeunit = require '../node_modules/nodeunit'
   # console.log nodeunit.reporters
   nodeunit.reporters.default.run exports
