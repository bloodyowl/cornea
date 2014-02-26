var matches = require("./matches")

module.exports = function createListener(rootNode, selector, listener){
  var view = this
  if(!selector) {
    return function(eventObject){
      return view[listener].call(view, eventObject, rootNode)
    }
  }
  return function(eventObject){
    var node
    if(node = matches(rootNode, eventObject.target, selector)) {
      return view[listener].call(view, eventObject, node)
    }
  }
}
