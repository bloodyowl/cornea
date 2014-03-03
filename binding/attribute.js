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
  set : function(node, key, value){
    if(map[key]) {
      node[map[key]] = value
      return
    }
    node.setAttribute(key, value)
  }
}
