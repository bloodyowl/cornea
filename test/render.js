var tape = require("tape")
var cornea = require("../")

tape("render", function(test){

  var view = cornea.extend({
    getInitialData : function(){
      return {
        foo : ""
      }
    },
    template : function(){
      return (
        cornea.DOM.div(null,
          this.binding("foo")
        )
      )
    }
  })
  .create()

  view.render()
  test.equal(view._bindings["foo"][0].element.nodeName, "SPAN")
  view.update({
    foo : "bar"
  })
  test.equal(view._bindings["foo"][0].element.innerHTML, "bar")
  test.end()
})


tape("render (escaped)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "<div>"
      }
    },
    template : function(){
      return (
        cornea.DOM.div(
          null,
          cornea.DOM.span(
            {
              className:"test"
            },
            this.binding("foo", {
              escape : true
            })
          )
        )
      )
    }
  })
  var el

  view.render()
  el = view.element.querySelector(".test")

  test.equal(el.innerHTML, "&lt;div&gt;")
  view.update({
    foo : "<span>"
  })
  test.equal(view.data.foo, "<span>")
  test.equal(view.element.querySelector(".test"), el, "same element")
  test.equal(el.innerHTML, "&lt;span&gt;")
  test.end()

})


tape("render (unescaped)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "<i></i>"
      }
    },
    template : function(){
      return (
        cornea.DOM.div(
          null,
          cornea.DOM.span(
            {
              className:"test"
            },
            this.binding("foo")
          )
        )
      )
    }
  })
  var el

  view.render()
  el = view.element.querySelector(".test")

  test.equal(el.innerHTML, "<span><i></i></span>")
  view.update({
    foo : "<b></b>"
  })
  test.equal(view.element.querySelector(".test"), el, "same element")
  test.equal(el.innerHTML, "<span><b></b></span>")
  test.end()
})


tape("render (value attribute)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "name"
      }
    },
    template : function(){
      return (
        cornea.DOM.input({
          value : this.binding("foo", {
            transform : function(data){
              return "yo " + data
            }
          })
        })
      )
    }
  })
  var el

  view.render()

  el = view.element.querySelector("input")

  test.equal(el.value, "yo name")
  view.update({
    "foo": "foo"
  })
  test.equal(view.element.querySelector("input"), el, "same element")
  test.equal(el.value, "yo foo")
  test.end()

})


tape("render (no template)", function(test){

  var view = cornea.create({})

  view.render()

  test.equal(view.element.innerHTML, "")
  test.end()
})

tape("update loop", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "bar" : "name",
        "foo" : "name"
      }
    },
    template : function(){
      return cornea.DOM.input({
        value : this.binding("foo", {
          transform : function(data){
            return "yo " + data
          }
        })
      })
    }
  })
  var el

  view.render()


  el = view.element.querySelector("input")

  test.equal(el.value, "yo name")
  view.update({
    bar : "foo",
    foo : "foo"
  })
  test.equal(view.element.querySelector("input"), el, "same element")
  test.equal(el.value, "yo foo")
  test.end()

})
