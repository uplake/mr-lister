listString = require './listString'
stringList = require './stringList'
listMainClause = require './listMainClause'

pollute = ->
   unless Array::listString?
      Object.defineProperty Array::, "listString", 
         value: (args...) -> listString.apply(null, [this].concat args)

   unless String::stringList?
      Object.defineProperty String::, "stringList", 
         value: (args...) -> stringList.apply(null, [this].concat args)

module.exports = {
   listString
   stringList
   listMainClause
   pollute
}

unless module.parent?
   pollute()
   console.log "1, 2, 3, 5-10".stringList()
   console.log [1,2,3,4,5, 10,11, 15].listString()
