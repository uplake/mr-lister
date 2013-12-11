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

listString = (inputArray, andor, article, comma = ', ') ->
   isRange = not andor?
   andor ?= 'and'
   andOrProvided = andor?.length > 0

   isRange = every inputArray, isInt
   if isRange
      # is numeric range
      arr = consolidateRanges(parseInt(a) for a in inputArray)
   else # test if alphabetic range
      isRange = every inputArray, (item) -> /^[a-z]$/i.test(item)
      arr = consolidateAlphaRanges(inputArray) if isRange

   if inputArray.length > 2
      if isRange 
         delimiter = comma if arr.length > 2
      else
         complex = any inputArray, (item) -> /,/.test(item)
         delimiter = if complex then '; ' else comma

   unless delimiter?
      delimiter = if andOrProvided then andor else ''
      delimiter = " #{delimiter} " if /^[\w\/]+$/i.test(delimiter)

   unless arr?
      arr = inputArray[..] # (item for item in inputArray when item?) 
   # add articles
   if /^an?$/.test article
      arr = for item in arr
         Articles.articlize(item)
   else if article?.length > 0
      arr = ("#{article} #{item}" for item in arr)

   arr.push "#{andor} #{arr.pop()}" if andOrProvided and (arr.length > 2)
   arr.join delimiter

listString.pollute = ->
   Object.defineProperty Array::, "listString", 
     writable : yes
     enumerable : no
     configurable : yes
     value: (andor, article, comma = ', ') -> listString(this, andor, article, comma)

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