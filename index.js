var klass = require("bloody-class")
  , events = require("./events")

module.exports = klass.extend({
  constructor : function(object){
    Object.keys(object || {})
      .forEach(function(key){
        this[key] = object[key]
      }, this)
    if(typeof this.element == "string") {
      this.element = document.querySelector(this.element)
      if(!this.element) {
        throw new Error("node has not been found")
      }
    }
    if(!this.element) {
      this.element = document.createElement("div")
    }
    if(typeof this.initialize == "function") {
      this.initialize.apply(this, arguments)
    }
    this.initEvents()
  },
  destructor : function(){
    if(typeof this.release == "function") {
      this.release.apply(this, arguments)
    }
    this.removeEvents()
  },
  initEvents : function(){
    events.listen(this)
  },
  removeEvents : function(){
    events.stopListening(this)
  }
})
