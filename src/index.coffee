listString = require './listString'
stringList = require './stringList'

pollute = ->
    Object.defineProperty Array::, "listString", 
       value: (args...) -> listString.apply(null, [this].concat args)

    Object.defineProperty String::, "stringList", 
       value: (args...) -> stringList.apply(null, [this].concat args)

module.exports = {
   listString
   stringList
   pollute
}

unless module.parent?
   pollute()
   console.log "1, 2, 3, 5-10".stringList()
   console.log [1,2,3,4,5, 10,11, 15].listString()
   