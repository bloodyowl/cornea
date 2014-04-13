var eventClass = require("bloody-events")
  , events = require("./events")
  , binding = require("./binding")
  , attribute = require("./binding/attribute")
  , template = require("./template")
  , extend = require("./utils/extend")
  , empty = function(){return ""}
  , _forEach = [].forEach

module.exports = eventClass.extend({

  constructor : function(object){
    eventClass.constructor.call(this)
    extend(this, object)
    if(typeof this.element == "string") {
      this.element = document.querySelector(this.element)
      if(!this.element) {
        return
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
    return binding.create(this, key)
  },

  template : empty,

  render : function(){
    var contents = this.template(this.data)
    this.element.innerHTML = ""
    if(typeof contents == "string") {
      this.element.innerHTML = contents
      return this.updateBindings()
    }
    if(contents && contents.nodeType) {
      this.element.innerHTML = ""
      this.element.appendChild(contents)
      this.updateBindings()
    }
  },

  updateBindings : function(){
    this.bindings =
      this.element.querySelectorAll("." + binding.CLASSNAME_BINDING)
  },

  update : function(key, value){
    _forEach.call(this.bindings, function(element){
      var property, templateString, content
      if(element.getAttribute(binding.ATTRIBUTE_KEY) != key) {
        return
      }
      property = element.getAttribute(binding.ATTRIBUTE_BINDING)
      templateString = element.getAttribute(binding.ATTRIBUTE_TEMPLATE)
      content = template(templateString, value, element.hasAttribute(binding.ATTRIBUTE_ESCAPE))
      attribute.set(element, property, content)
    })
  }
})
