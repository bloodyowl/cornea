# cornea

[![browser support](https://ci.testling.com/bloodyowl/cornea.png)](https://ci.testling.com/bloodyowl/cornea)

cornea is a simple view manager inspired by [backbonejs](http://backbonejs.org) to help you organise your code. 

## install

```shell
$ npm install cornea
```

## require

```javascript
var cornea = require("cornea")
```

## use

### `cornea.extend(options)`, `cornea#extend(options)`

Creates a subclass. Useful for sharing common handlers. 

### `cornea#create(options)` 

Creates a `cornea` view. Binds events. 

### `cornea#destroy` 

Unbinds the events. 

### `cornea#render` 

Renders the given template into `view.element`. 

### `cornea.binding(key)`

Returns a `binding` object for the given `key`. 

### `cornea.data`

Object for template data, bindings relate to it. 

### `cornea.update(key, value)`

Updates bindings for `key` with `value`. 

### `binding`

#### `binding.toNode(bindingOptions)` 

Returns a bound node. 

#### `binding.toString(bindingOptions)`

Returns the string representation of a bound node. 

##### `bindingOptions`

* `bindingOptions.escape`
* `bindingOptions.className`
* `bindingOptions.nodeName`
* `bindingOptions.attributes` (object, as key:value)
* `bindingOptions.template` (string, where `#{*}` is the bound value)

#### `binding.bindAttribute(node, attributeName, options)`

Binds `attributeName`. 
Options are : 

* `bindingOptions.escape`
* `bindingOptions.template`

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

## example

```javascript
var cornea = require("cornea")

module.exports = cornea.extend({
  /*
    define a selector or a node as element
  */
  element : "#js-Navigation",
  /*
    some optional initialization code
  */
  initialize : function(){
    this.element.classList.remove("Navigation--hidden")
  },
  /*
    some optional release code (when the view is destroyed)
  */
  release : function(){
    this.element.classList.add("Navigation--hidden")
  },
  /*
    your desired events
  */
  events : [
    {
      type : "click",
      selector : ".js-ShowField",
      listener : "showField"
    }
  ],
  
  data : {
    value : "you"
  },
  
  template : function(){
    var input = document.createElement("input")
    this.binding("value").bindAttribute(input, "value", {template:"hello #{*}"})
    return input
  },
  /*
    and their listeners
  */
  showField : function(eventObject, target){
    this.render()
  }
})
```

and init your view :

```javascript
var view = require("./myView")

var myView = view.create({
  option1 : "foo"
})

myView.update("value", "USERNAME")

myView.destroy()
```
