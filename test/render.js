var tape = require("tape")
var cornea = require("../")

tape("render", function(test){

  var view = cornea.create({
    template : function(){
      return [
        "<div>",
        this.binding("foo").toString({
          nodeName : "span"
        }),
        "</div>"
      ].join("")
    }
  })

  view.render(function(){
    test.equal(view.bindings.length, 1)
    test.equal(view.bindings[0].nodeName, "SPAN")
    view.update({
      foo : "bar"
    })
    test.equal(view.bindings[0].innerHTML, "bar")
    test.end()
  })
})


tape("render (escaped)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "<div>"
      }
    },
    template : function(){
      return [
        "<div>",
        this.binding("foo").toString({
          className : "test",
          nodeName : "span",
          escape : true
        }),
        "</div>"
      ].join("")
    }
  })
  var el

  view.render(function(){
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

})


tape("render (unescaped)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "<i></i>"
      }
    },
    template : function(){
      return [
        "<div>",
        this.binding("foo").toString({
          className : "test",
          nodeName : "span",
          escape : false
        }),
        "</div>"
      ].join("")
    }
  })
  var el

  view.render(function(){
    el = view.element.querySelector(".test")

    test.equal(el.innerHTML, "<i></i>")
    view.update({
      foo : "<b></b>"
    })
    test.equal(view.element.querySelector(".test"), el, "same element")
    test.equal(el.innerHTML, "<b></b>")
    test.end()
  })

})


tape("render (value attribute)", function(test){

  var view = cornea.create({
    getInitialData : function(){
      return {
        "foo" : "name"
      }
    },
    template : function(){
      var input = document.createElement("input")
      this.binding("foo").bindAttribute(input, "value", {
        template: "yo #{*}"
      })
      return input
    }
  })
  var el

  view.render(function(){
    el = view.element.querySelector("input")

    test.equal(el.value, "yo name")
    view.update({
      "foo": "foo"
    })
    test.equal(view.element.querySelector("input"), el, "same element")
    test.equal(el.value, "yo foo")
    test.end()
  })

})


tape("render (no template)", function(test){

  var view = cornea.create({})

  view.render(function(){
    test.equal(view.element.innerHTML, "")
    test.end()
  })

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
      var input = document.createElement("input")
      this.binding("foo").bindAttribute(input, "value", {
        template: "yo #{*}"
      })
      return input
    }
  })
  var el

  view.render(function(){
    el = view.element.querySelector("input")

    test.equal(el.value, "yo name")
    view.update({
      bar : "foo",
      foo : "foo"
    })
    test.equal(view.element.querySelector("input"), el, "same element")
    test.equal(el.value, "yo foo")
  })
  .then(function(){
    test.pass("returns a promise")
    test.end()
  })

})
