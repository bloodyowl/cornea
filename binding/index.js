var klass = require("bloody-class")
  , template = require("../template")
  , attribute = require("./attribute")

module.exports = klass.extend({

  ATTRIBUTE_BINDING : "data-cornea-binding",
  ATTRIBUTE_KEY : "data-cornea-key",
  ATTRIBUTE_ESCAPE : "data-cornea-escape",
  ATTRIBUTE_TEMPLATE : "data-cornea-template",
  CLASSNAME_BINDING : "cornea-binding",

  constructor : function(view, key){
    this.view = view
    this.key = key
  },

  toString : function(options){
    return this.toNode(options).outerHTML
  },

  toNode : function(options){
    if(options == void 0) options = {}
    var node = document.createElement(options.nodeName || "div")
      , escape = options.hasOwnProperty("escape") ? options.escape : true
      , tmpl
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
    node.setAttribute(this.ATTRIBUTE_TEMPLATE, tmpl = options.template || "#{*}")
    if(escape) node.setAttribute(this.ATTRIBUTE_ESCAPE, "")
    attribute.set(node, "innerHTML", template(tmpl, this.view.data && this.view.data[this.key], escape))
    return node
  },

  bindAttribute : function(node, attributeName, options){
    if(options == void 0) options = {}
    var escape = options.hasOwnProperty("escape") ? options.escape : true
      , tmpl
    node.setAttribute(this.ATTRIBUTE_BINDING, attributeName)
    node.setAttribute(this.ATTRIBUTE_KEY, this.key)
    node.setAttribute(this.ATTRIBUTE_TEMPLATE, tmpl = options.template || "#{*}")
    node.className = (node.className + " " + this.CLASSNAME_BINDING).trim()
    if(escape) node.setAttribute(this.ATTRIBUTE_ESCAPE, "")
    attribute.set(node, attributeName, template(tmpl, this.view.data && this.view.data[this.key], escape))
  }
})
