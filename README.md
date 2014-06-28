# cornea

[![browser support](https://ci.testling.com/bloodyowl/cornea.png)](https://ci.testling.com/bloodyowl/cornea)

cornea is a simple view manager inspired by [backbonejs](http://backbonejs.org) to help you organise your code.

## key features

- DOM event organiser
- testable methods
- compatible with any kind of templates (string and nodes)
- elements/attributes/properties binding (with micro-templates)
- dynamic stylesheet modification for high performance
- class-event for modules communication
- no zombie-view
- creation and destruction hooks
- 4k minified and gzip

## install

```shell
$ npm install cornea
```

## require

```javascript
var cornea = require("cornea")
```

## use

### `cornea.extend(options)`

Creates a subclass. Useful for sharing common handlers.

### `cornea#create(options) > c`

Creates a `cornea` view. Binds events.

### `c.destroy`

Unbinds the events.

### `c.render()`

Renders the given template into `view.element`.

### `c.binding(key)`

Returns a `binding` object for the given `key`.

### `c.getInitialData(fn)`

Object for template data, bindings relate to it.

```javascript
cornea.extend({
  getInitialData : function(){
    return {
      foo : "bar"
    }
  }
})
```

### `c.update(object)`

Updates data with the keys and values in object.

### `c.setStyle(selector, properties)`

Sets the style for the given `selector` with the properties.

`properties` should be written like `{"font-size":"3em"}`.

Passing `null` as a value resets the property to its defaults.

Styles are scoped to the view.

---

### `DOM`

cornea have a `cornea.DOM` object containing methods to create elements.

e.g.

```javascript
cornea.DOM.div(null) // <div></div>
cornea.DOM.div({className:"foo"}) // <div class="foo"></div>
cornea.DOM.div(null, "foo") // <div>foo</div>
cornea.DOM.div(null, "foo", cornea.DOM.span(null)) // <div>foo<span></span></div>
```

---

### `binding`

#### `c.binding(key[, options])`

creates a binding.

```javascript
cornea.DOM.div(null, this.binding("value"))
```

##### options

- `escape` (default to `false`)
- `transform` (default, `function(a){return a}`)

---

### `options`

#### `options.element`

`String` or `Node`, optional.
View root.
If not defined, an empty `<div>` will be created.

#### `options.template`

`Function`, optional (default : `-> ""`).

Template called on `.render`. Should return a `string` or a `node`.

#### `options.initialize`

`Function`, optional.
Code to execute when the `view.create` method is called.
Its `thisValue` is the current `view` and its arguments are the one passed to `view.create`.

**note** The first `.create` argument is though reserved to the `view` extension.  

#### `options.release`

`Function`, optional.
Code to execute when the `view.destroy` method is called.


#### `options.events`

`Array`, optional.
List of events to bind.

#### `options.events[index]`

* `type` String, event type (e.g. `click`)
* `selector` String (optional), delegation selector
* `listener` String, name of the view's method to bind
* `capture` Boolean (optional, default: `false`), `useCapture` flag.

**note** : if `view.listener` changes, it will affect the event callback
(a hook is set and fetches the right method)

---

## class-events

**NOTE** : These are `cornea` events, not DOM ones.
This is mainly app communication.

### `cornea.on(type, listener)`

listens the the `type` event and attaches `listener` to it.

### `cornea.off([type[, listener]])`

stops listening :

- if no argument is set : all events
- if `type` is set : all `type` events
- if `type` and `listener` are set : the `listener` for this `type`

### `cornea.emit(type[, data…])`

fires synchronously the given `type` event, passing the `data…` arguments to the listeners.


## example

```javascript
/** @jsx cornea.DOM */
var cornea = require("cornea")
var app = require("./app")

module.exports = cornea.extend({
  element : ".Lightbox",
  initialize : function(){
    var lightbox = this
    app.on("lightbox:show", function(data){
      lightbox.update("value", data)
      lightbox.show()
    })
  },
  getInitialData : function(){
    return {
      value : ""
    }
  },
  events : [
    {
      type : "click",
      selector : ".js-close",
      listener : "hide"
    }
  ],
  hide : function(){
    this.element.classList.remove("Lightbox--visible")
  },
  show : function(left, top){
    this.element.classList.add("Lightbox--visible")
    this.setStyle(".Lightbox-lightbox", {
      "top" : top + "px",
      "left" : left + "px"
    })
    this.emit("lightbox:show")
  },
  template : function(data){
    return (
       <div>
        <div className="Lightbox-overlay" />
        <div className="Lightbox-lightbox">
          <button className="Lightbox-close js-Close">
            {"&times;"}
          </button>
          <div className="Lightbox-content">
            {this.binding("value")}
          </div>
        </div>
      </div>
    )
  }
})
```

and init your view :

```javascript
var view = require("./myView")
var otherView = require("./otherView").create()

var myView = view.create()
myView.render()
myView.update({
  value : "oh hai"
})
myView.on("lightbox:show", function(){
  otherView.hide()
})
```
