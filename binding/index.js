var klass = require("bloody-class")

module.exports = klass.extend({

  ATTRIBUTE_BINDING : "data-cornea-binding",
  ATTRIBUTE_KEY : "data-cornea-key",
  ATTRIBUTE_ESCAPE : "data-cornea-escape",
  ATTRIBUTE_TEMPLATE : "data-cornea-template",
  CLASSNAME_BINDING : "cornea-binding",

  constructor : function(key){
    this.key = key
  },

  toString : function(options){
    return this.toNode(options).outerHTML
  },

  toNode : function(options){
    if(options == void 0) options = {}
    var node = document.createElement(options.nodeName || "div")
      , escape = options.hasOwnProperty("escape") ? options.escape : true
    node.className =
      this.CLASSNAME_BINDING +
      (options.className ? " " + options.className : "")

    if(options.attributes) {
      Object.keys(options.attributes)
        .forEach(function(key){
          node.setAttribute(key, options.attributes[key])
        })
    }


    node.setAttribute(this.ATTRIBUTE_BINDING, "innerHTML")
    node.setAttribute(this.ATTRIBUTE_KEY, this.key)
    node.setAttribute(this.ATTRIBUTE_TEMPLATE, options.template || "#{*}")
    if(escape) node.setAttribute(this.ATTRIBUTE_ESCAPE, "")
    return node
  },

  bindAttribute : function(node, attributeName, options){
    if(options == void 0) options = {}
    var escape = options.hasOwnProperty("escape") ? options.escape : true
    node.setAttribute(this.ATTRIBUTE_BINDING, attributeName)
    node.setAttribute(this.ATTRIBUTE_KEY, this.key)
    node.setAttribute(this.ATTRIBUTE_TEMPLATE, options.template || "#{*}")
    node.className = (node.className + " " + this.CLASSNAME_BINDING).trim()
    if(escape) node.setAttribute(this.ATTRIBUTE_ESCAPE, "")
  }
})
