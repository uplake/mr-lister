{
  isNumber
  isInt
  unique
  consolidateRanges
  consolidateAlphaRanges
  every
  any
} = require './utils'

Articles = require('Articles')
{toString} = Object::

# listString = (me, andor, article, comma = ', ') ->
listString = (me, options = {}) ->
   if toString.call(options) is '[object String]'
      # compatability with old-style fn call
      andor = options
      options = {
         article: arguments[2]
         comma: arguments[3]
      }
   else
      andor = options.andor ? options.conjunction ? 'and'

   # andor ?= 'and'
   andOrProvided = andor?.length > 0
   article = options.article
   comma = options.comma ? options.separator ? ', '

   isRange = every me, isInt
   if isRange
      # is numeric range
      arr = consolidateRanges(parseInt(a) for a in me)
   else # test if alphabetic range
      isRange = every me, (item) -> /^[a-z]$/i.test(item)
      arr = consolidateAlphaRanges(me) if isRange

   if me.length > 2
      if isRange 
         delimiter = comma if arr.length > 2
      else
         complex = any me, (item) -> /,/.test(item)
         delimiter = if complex then '; ' else comma

   unless delimiter?
      delimiter = if andOrProvided then andor else ''
      delimiter = " #{delimiter} " if /^[\w\/]+$/i.test(delimiter)

   unless arr?
      arr = me[..] # (item for item in me when item?) 
   # add articles
   if /^an?$/.test article
      arr = for item in arr
         Articles.articlize(item)
   else if article?.length > 0
      arr = ("#{article} #{item}" for item in arr)

   arr.push "#{andor} #{arr.pop()}" if andOrProvided and (arr.length > 2)
   arr.join delimiter

module.exports = listString

if require.main is module
   test = (item) -> /\d/.test(item)
   arr = [1..1000]
   console.time 'every'
   x = for i in [1..1000]
      arr.every test
   console.timeEnd 'every'

   console.time 'myevery'
   x = for i in [1..1000]
      every arr, test
   console.timeEnd 'myevery'