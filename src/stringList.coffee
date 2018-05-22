
stringList = (me, options = {}) ->
   sort = options.sort ? yes
   unique = options.unique ? yes
   numbers = []
   # allow dash, en-dash, or em-dash between ranges
   # allow a dot after the first number in a range
   pat = /(\d+)(?:[.]?\s*[-\u2013\u2014]\s*(\d+))?/g
   while (res = pat.exec me)
      num = res[1]
      endNum = res[2] ? num
      if endNum.length < num.length
        # if we have a range such as 110-15, then copy
        # the leading chars from the first num
        endNum = "#{num.slice(0, -endNum.length)}#{endNum}"
      
      num = parseInt(num, 10)
      endNum = parseInt(endNum, 10)

      if endNum < num
         [endNum, num] = [num, endNum]

      while num <= endNum
         numbers.push num unless unique and (num in numbers)
         num++

   if sort
      numbers.sort (a,b) -> a-b

   numbers

module.exports = stringList
