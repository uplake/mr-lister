isNumber = (n) -> !isNaN(parseFloat(n)) && isFinite(n)
isInt = (value) ->
   not isNaN(parseInt(value, 10)) and (parseFloat(value, 10) is parseInt(value, 10))

unique = (arr) ->
   output = {}
   output[arr[key]] = arr[key] for key in [0...arr.length]
   value for key, value of output

consolidateRanges = (inputArray, delimiter = '–') ->
    arr = unique(inputArray).sort (a,b) -> a-b
    rangeEnds = []
    rangeBegs = []
    for num, i in arr
         rangeBegs.push(num) unless num is arr[i-1]+1
         rangeEnds.push(num) unless num is arr[i+1]-1

    for start, i in rangeBegs
         end = rangeEnds[i]
         if start is end
             start
         else
             "#{start}#{delimiter}#{end}"

consolidateAlphaRanges = (inputArray, delimiter = '–') ->
    arr = unique(inputArray).sort()
    rangeEnds = []
    rangeBegs = []
    for ltr, i in arr
         rangeBegs.push(ltr) unless ltr.charCodeAt() is arr[i-1]?.charCodeAt()+1
         rangeEnds.push(ltr) unless ltr.charCodeAt() is arr[i+1]?.charCodeAt()-1

    for start, i in rangeBegs
         end = rangeEnds[i]
         if start is end
             start
         else
             "#{start}#{delimiter}#{end}"

every = (arr, testFn) -> # slightly faster than [].every
   for item, i in arr when not testFn(item, i)
      return no
   return yes

any = (arr, testFn) -> 
   for item, i in arr when testFn(item, i)
      return yes
   return no



module.exports = {
   isNumber
   isInt
   unique
   every
   any
   consolidateRanges
   consolidateAlphaRanges
}