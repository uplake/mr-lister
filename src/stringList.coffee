
stringList = (me, options = {}) ->
   sort = options.sort ? yes
   unique = options.unique ? yes
   numbers = []
   # allow dash, en-dash, or em-dash between ranges
   # allow a dot after the first number in a range
   pat = /(\d+)(?:[.]?\s*[-\u2013\u2014]\s*(\d+))?/g
   while (res = pat.exec me)
      num = parseInt res[1]
      endNum = parseInt(res[2] ? num)

      if endNum < num
         [endNum, num] = [num, endNum]

      while num <= endNum
         numbers.push num unless unique and (num in numbers)
         num++

   if sort
      numbers.sort (a,b) -> a-b

   numbers

module.exports = stringList
