var docEl = document.documentElement
  , nativeMatchesSelector =
      docEl.matches ||
      docEl.matchesSelector ||
      docEl.webkitMatchesSelector ||
      docEl.mozMatchesSelector ||
      docEl.oMatchesSelector ||
      docEl.msMatchesSelector

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
    if(node == rootNode) break
    if(node.nodeType != node.ELEMENT_NODE) break
    if(nativeMatchesSelector.call(node, selector)) {
      return node
    }
  }
  return false
}