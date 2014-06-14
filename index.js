var eventClass = require("bloody-events")
  , events = require("./events")
  , binding = require("./binding")
  , attribute = require("./binding/attribute")
  , styles = require("./styles")
  , template = require("./template")
  , extend = require("./utils/extend")
  , empty = function(){return ""}
  , _forEach = [].forEach
  , asap = require("asap")
  , promise = require("bloody-promise")
  , uniq = -1

module.exports = eventClass.extend({

  _styles: null,

  constructor : function(object){
    var view = this
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
    this.bindings = []
    if(!this.element.hasAttribute("data-cornea-id")) {
      this.element.setAttribute("data-cornea-id", ++uniq)
    }
    this.id = this.element.getAttribute("data-cornea-id")
    if(typeof this.initialize == "function") {
      this.initialize.apply(this, arguments)
    }
    this.initEvents()
    if(typeof this.getInitialData == "function") {
      this._data = promise.create(function(resolve){
        var value = view.getInitialData(resolve)
        if(value != null) {
          resolve(value)
        }
      })
    } else {
      this._data = promise.create(function(resolve){
        resolve({})
      })
    }
    this._data.then(function(value){
      view.data = value
      view.emit("dataReceived", value)
    })
    asap(function(){
      view.emit("create")
    })
  },

  destructor : function(){
    if(typeof this.release == "function") {
      this.release.apply(this, arguments)
    }
    this.removeEvents()
    if(this._styles != null) {
      this._styles.destroy()
    }
    this.emit("destroy")
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

  render : function(cb){
    var view = this
    var then = this._data.then(function(){
      view.emit("beforeRender")
      var contents = view.template(view.data)
      view.element.innerHTML = ""
      if(typeof contents == "string") {
        view.element.innerHTML = contents
        view.updateBindings()
        return
      }
      if(contents && contents.nodeType) {
        view.element.innerHTML = ""
        view.element.appendChild(contents)
        view.updateBindings()
      }
    })
    then.then(function(){
      view.emit("afterRender")
    })
    then.then(cb)
    return then
  },

  updateBindings : function(){
    this.bindings =
      this.element.querySelectorAll("." + binding.CLASSNAME_BINDING)
  },

  update : function(object){
    var key
    var value
    if(object == null || typeof object != "object") {
      return
    }
    this.emit("beforeUpdate")
    for(key in object) {
      value = object[key]
      if(this.data != null) {
        this.data[key] = value
      }
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
    this.emit("afterUpdate")
  },

  setStyle : function(selectorText, properties){
    if(this._styles == null) {
      this._styles = styles.create(this)
    }
    this._styles.setStyle(selectorText, properties)
    this.emit("styleChange")
  }

})
