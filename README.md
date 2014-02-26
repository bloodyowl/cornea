# cornea

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
      selector : ".js-ShowDropdown",
      listener : "showDropdown"
    },
    {
      type : "load",
      selector : "img",
      listener : "hideLoader"
      capture : true
    }
  ],
  /*
    and their listeners
  */
  showDropdown : function(eventObject, target){
    target.nextElementSibling
      .classList.remove(".Navigation-dropdown--hidden")
  },
  hideLoader : function(eventObject, target){
    target.parentNode
      .removeChild(target.previousElementSibling)
  }
})
```

and init your view :

```javascript
var view = require("./myView")

var myView = view.create({
  option1 : "foo"
})

myView.destroy()
```
