var docEl = document.documentElement
var nativeMatchesSelector =
  docEl.matches ||
  docEl.matchesSelector ||
  docEl.webkitMatchesSelector ||
  docEl.mozMatchesSelector ||
  docEl.oMatchesSelector ||
  docEl.msMatchesSelector ||
  function(selector) {
    var element = this
    var parent = element.parentNode
    var match
    var index = -1
    var length
    if(!parent) {
      return false
    }
    match = parent.querySelectorAll(selector)
    length = match.length
    while(++index < length) {
      if(match[index] == element) {
        return true
      }
    }
    return false
  }

if(!nativeMatchesSelector) {
  throw new Error("this browser does not support .matchesSelector")
}

module.exports = function(rootNode, node, selector){
  if(node == rootNode) {
    return false
  }
  if(nativeMatchesSelector.call(node, selector)) {
    return node
  }
  while(node = node.parentNode) {
    if(node == rootNode) {
      break
    }
    if(node.nodeType != node.ELEMENT_NODE) {
      break
    }
    if(nativeMatchesSelector.call(node, selector)) {
      return node
    }
  }
  return false
}
