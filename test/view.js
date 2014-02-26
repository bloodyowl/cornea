var tape = require("tape")
  , cornea = require("../")

function customEvent(element, type) {
  var evt = document.createEvent('Event')
  evt.initEvent(type, true, true)
  element.dispatchEvent(evt)
}

tape("events", function(test){
  
  test.plan(13)
  
  var div = document.createElement("div")
    , span = document.createElement("span")
  
  var view = cornea.create({
    initialize : function(){
      test.equal(++this.VALUE, 1, "initialize has thisValue")
    },
    release : function(){
      test.equal(++this.VALUE, 2, "release has thisValue")
    },
    VALUE : 0,
    element : document.body,
    events : [
      {
        type : "foo",
        selector : ".testClass-div--listener",
        listener : "foo"
      },
      {
        type : "baz",
        listener : "baz"
      },
      {
        type : "bar",
        selector : ".testClass-div--listener",
        listener : "bar",
        capture : true
      }
    ],
    FOO: 0,
    foo : function(eventObject, target){
      test.equal(this, view, "view as thisValue", "bubbling thisValue")
      test.equal(eventObject.eventPhase, eventObject.BUBBLING_PHASE, "is bubbling")
      test.equal(target.className, "testClass-div--listener", "target is right")
      test.equal(++this.FOO, 1, "runs once")
    },
    BAR: 0,
    bar : function(eventObject, target){
      test.equal(this, view, "view as thisValue", "capturing thisValue")
      test.equal(eventObject.eventPhase, eventObject.CAPTURING_PHASE, "is capturing")
      test.equal(target.className, "testClass-div--listener", "target is right")
      test.equal(++this.BAR, 1, "runs once")
    },
    BAZ: 0,
    baz : function(eventObject, target){
      test.equal(this, view, "view as thisValue", "same node thisValue")
      test.equal(target, document.body, "root node is passed")
      test.equal(++this.BAZ, 1, "runs once")
    }
  })

  div.className = "testClass-div--listener"
  span.className = "testClass-span--listener"
  
  document.body.appendChild(div)
  div.appendChild(span)
  
  customEvent(span, "foo")
  customEvent(span, "bar")
  customEvent(span, "baz")
  
  setTimeout(function(){
    view.destroy()
    customEvent(span, "foo")
    customEvent(span, "bar")
    customEvent(span, "baz")
  }, 300)

})


tape("no config", function(test){
  test.doesNotThrow(function(){
    var view = cornea.create()
    test.equal(view.element.nodeName, "DIV", "adds a default element")
    view.destroy()
  }, "doesn't throw if no params were defined")
  test.end()
})
