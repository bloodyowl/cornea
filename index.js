var eventMixin = require("bloody-events")
var klass = require("bloody-class")
var extend = require("./utils/extend")

var events = require("./events")

var DOM = require("./dom")
var setProperty = require("./dom/set-property")
var binding = require("./binding")

var styles = require("./styles")

var empty = function(){return ""}
var uniq = -1

module.exports = klass.extend({

  _styles: null,

  mixins : [eventMixin],

  constructor : function(object){
    var view = this
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
    this._bindings = {}
    if(!this.element.hasAttribute("data-cornea-id")) {
      this.element.setAttribute("data-cornea-id", ++uniq)
    }
    this.id = this.element.getAttribute("data-cornea-id")
    if(typeof this.getInitialData == "function") {
      this.data = this.getInitialData()
    } else {
      this.data = {}
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
    this._bindings = {}
    if(this._styles != null) {
      this._styles.destroy()
    }
  },

  _updateBindings : function(changes){
    var keys = Object.keys(changes)
    keys.forEach(function(key){
      if(!this._bindings.hasOwnProperty(key)) {
        return
      }
      this._bindings[key].forEach(function(item){
        setProperty(
          item.element,
          item.property,
          item.transform(changes[key])
        )
      })
    }, this)
  },

  initEvents : function(){
    events.listen(this)
  },

  removeEvents : function(){
    events.stopListening(this)
  },

  binding : binding,

  DOM : DOM,

  template : empty,

  render : function(){
    this._bindings = {}
    var contents = this.template(this.data)
    this.element.innerHTML = ""
    if(typeof contents == "string") {
      this.element.innerHTML = contents
      return
    }
    if(contents && contents.nodeType) {
      this.element.innerHTML = ""
      this.element.appendChild(contents)
    }
    return this
  },

  update : function(object){
    if(object == null || typeof object != "object") {
      throw new TypeError("expected an object")
    }
    this.data = extend(extend({}, this.data), object)
    this._updateBindings(object)
  },

  setStyle : function(selectorText, properties){
    if(this._styles == null) {
      this._styles = styles.create(this)
    }
    this._styles.setStyle(selectorText, properties)
  }

})
