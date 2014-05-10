var tape = require("tape")
  , cornea = require("../")

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

  view.render()

  test.equal(view.bindings.length, 1)
  test.equal(view.bindings[0].nodeName, "SPAN")
  view.update("foo", "bar")
  test.equal(view.bindings[0].innerHTML, "bar")
  test.end()

})


tape("render (escaped)", function(test){

  var view = cornea.create({
        data : {
          "foo" : "<div>"
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
    , el

  view.render()
  el = view.element.querySelector(".test")

  test.equal(el.innerHTML, "&lt;div&gt;")
  view.update("foo", "<span>")
  test.equal(view.data.foo, "<span>")
  test.equal(view.element.querySelector(".test"), el, "same element")
  test.equal(el.innerHTML, "&lt;span&gt;")
  test.end()

})


tape("render (unescaped)", function(test){

  var view = cornea.create({
        data : {
          "foo" : "<i></i>"
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
    , el

  view.render()
  el = view.element.querySelector(".test")

  test.equal(el.innerHTML, "<i></i>")
  view.update("foo", "<b></b>")
  test.equal(view.element.querySelector(".test"), el, "same element")
  test.equal(el.innerHTML, "<b></b>")
  test.end()

})


tape("render (value attribute)", function(test){

  var view = cornea.create({
        data : {
          "foo" : "name"
        },
        template : function(){
          var input = document.createElement("input")
          this.binding("foo").bindAttribute(input, "value", {
            template: "yo #{*}"
          })
          return input
        }
      })
    , el

  view.render()
  el = view.element.querySelector("input")

  test.equal(el.value, "yo name")
  view.update("foo", "foo")
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
        data : {
          "bar" : "name",
          "foo" : "name"
        },
        template : function(){
          var input = document.createElement("input")
          this.binding("foo").bindAttribute(input, "value", {
            template: "yo #{*}"
          })
          return input
        }
      })
    , el

  view.render()
  el = view.element.querySelector("input")

  test.equal(el.value, "yo name")
  view.update("bar", "foo")
  view.update("foo", "foo")
  test.equal(view.element.querySelector("input"), el, "same element")
  test.equal(el.value, "yo foo")
  test.end()

})
