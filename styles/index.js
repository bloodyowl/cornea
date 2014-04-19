var klass = require("bloody-class")
  , head = document.head || document.getElementByTagName("head")[0]
  , hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = klass.extend({
  constructor : function(){
    this.element = document.createElement("style")
    head.appendChild(this.element)
    this.sheet = this.element.sheet
    this._selectors = {}
  },
  destructor : function(){
    if(this.element.parentNode == head) {
      head.removeChild(this.element)
    }
    this.element = null
  },
  createRule : function(selectorText){
    var index = this.sheet.cssRules.length
      , selector = selectorText.trim()
    this._selectors[selector] = index
    this.sheet.insertRule(
      selector + " {}",
      index
    )
    return this.sheet.rules[index]
  },
  getRule : function(selectorText){
    var selector = selectorText.trim()
      , index = this._selectors[selector]
    if(index == null) {
      return null
    }
    return this.sheet.rules[index]
  },
  setStyle : function(selectorText, properties){
    var rule = this.getRule(selectorText)
      , key, property
    if(rule == null) {
      rule = this.createRule(selectorText)
    }
    if(!properties) {
      return
    }
    for(key in properties) {
      if(!hasOwnProperty.call(properties, key)) {
        continue
      }
      property = properties[key]
      if(property == null) {
        rule.style.removeProperty(key)
        continue
      }
      rule.style.setProperty(key, property)
    }
  }
})
