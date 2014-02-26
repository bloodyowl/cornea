var klass = require("bloody-class")
  , extend = require("bloody-collections/lib/extend")
  , events = require("./events")

module.exports = klass.extend({
  constructor : function(object){
    extend(this, object)
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
