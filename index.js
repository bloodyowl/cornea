var klass = require("bloody-class")
  , events = require("./events")
  , binding = require("./binding")
  , template = require("./template")
  , extend = require("./utils/extend")

module.exports = klass.extend({

  constructor : function(object){
    extend(this, object)
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
  },

  binding : function(key){
    return binding.create(key)
  },

  render : function(){
    var contents = this.template(this.data)
    this.element.innerHTML = ""
    if(typeof template == "string") {
      this.element.innerHTML = contents
      return
    }
    if(template && template.nodeType) {
      this.element.innerHTML = ""
      this.element.appendChild(template)
    }
    this.updateBindings()
  },

  updateBindings : function(){
    this.bindings =
      this.element.querySelectorAll("." + binding.CLASSNAME_BINDING)
  },

  update : function(key, value){
    this.bindings
      .forEach(function(element){
        var property, templateString, content
        if(element.getAttribute(binding.ATTRIBUTE_KEY) != key) {
          return
        }

        property = element.getAttribute(binding.ATTRIBUTE_BINDING)
        templateString = element.getAttribute(binding.ATTRIBUTE_TEMPLATE)
        content = template(templateString, value)

        if(property == "innerHTML") {
          element.innerHTML = content
          return
        }
        element.setAttribute(property, content)
      })
  }
})
