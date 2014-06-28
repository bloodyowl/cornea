var setProperty = require("../dom/set-property")
var pass = function(data){
  return data
}
module.exports = function(key, options){
  var view = this
  if(options == null) {
    options = {}
  }
  if(typeof options.transform != "function") {
    options.transform = pass
  }
  return function(element, property){
    var value = options.transform(view.data[key])
    if(!Array.isArray(view._bindings[key])) {
      view._bindings[key] = []
    }
    if(arguments.length == 0) {
      if(options.escape) {
        element = document.createTextNode(value)
        property = "nodeValue"
      } else {
        element = document.createElement("span")
        property = "innerHTML"
        setProperty(element, property, value)
      }
      view._bindings[key].push({
        element : element,
        property : property,
        transform : options.transform
      })
      return element
    }
    view._bindings[key].push({
      element : element,
      property : property,
      transform : options.transform
    })
    return options.transform(view.data[key])
  }
}
