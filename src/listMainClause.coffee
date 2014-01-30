pluralize = require 'pluralize'
NounInflector = require('natural/lib/natural/inflectors/noun_inflector')
PresentVerbInflector = require('natural/lib/natural/inflectors/present_verb_inflector')

nounInflector = new NounInflector()
verbInflector = new PresentVerbInflector()

listString = require './listString'

listMainClause = (list, noun, verb) ->
   cmd = if list.length > 1
      'pluralize'
   else
      'singularize'

   verbStr = if verb? then ' ' + verbInflector[cmd](verb) else ''
   nounStr = if noun? then nounInflector[cmd](noun) + ' ' else ''

   "#{nounStr}#{listString list}#{verbStr}"

module.exports = listMainClause

unless module.parent?
   console.log listMainClause [1], "Claim", 'claim'
   console.log listMainClause [1, 3, 5], "Claim", 'claim'
   console.log listMainClause [1, 3, 5], "Claim"
   console.log listMainClause [1, 3, 5], null, 'is'
   console.log verbInflector.pluralize 'run'
   console.log verbInflector.singularize 'run'