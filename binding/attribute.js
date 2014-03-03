var map = {
  id : "id",
  value : "value",
  selected : "selected",
  checked : "checked",
  href : "href",
  "class" : "className",
  className : "className",
  innerHTML : "innerHTML",
  textContent : "textContent",
  innerText : "innerText"
}
module.exports = {
  get : function(node, key){
    if(map[key]) return node[map[key]]
    return node.getAttribute(key)
  },
  set : function(node, key, value){
    if(map[key]) {
      node[map[key]] = value
      return
    }
    node.setAttribute(key, value)
  }
}
