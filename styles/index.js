var klass = require("bloody-class")
  , head = document.head || document.getElementsByTagName("head")[0]
  , hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = klass.extend({
  constructor : function(view){
    this.element = document.createElement("style")
    head.appendChild(this.element)
    this.view = view
    this._selectors = {}
  },
  destructor : function(){
    if(this.element.parentNode == head) {
      head.removeChild(this.element)
    }
    this.element = null
  },
  _createSelector : function(selector){
    var scope = [
      "[data-cornea-id=\"",
        this.view.id,
      "\"] "
    ].join("")
    return scope + selector.split(",").join(", " + scope)
  },
  createRule : function(selectorText){
    var index = this.element.sheet.cssRules.length
      , selector = selectorText.trim()
    this._selectors[selector] = index
    this.element.sheet.insertRule(
      this._createSelector(selector) + " {}",
      index
    )
    return this.element.sheet.cssRules[index]
  },
  getRule : function(selectorText){
    var selector = selectorText.trim()
      , index = this._selectors[selector]
    if(index == null) {
      return null
    }
    return this.element.sheet.cssRules[index]
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
