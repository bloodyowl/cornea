var tape = require("tape")
var createListener = require("../events/createListener")

tape("createListener (no selector)", function(test){

  var fakeEventObject = {}
  var fakeView = {
    foo : function(eventObject, target){
      test.equal(fakeView, this, "passes view as thisValue")
      test.equal(target, document.body, "passes rootNode as target")
      test.equal(eventObject, fakeEventObject, "passes eventObject")
    }
  }
  var div = document.createElement("div")
  var span = document.createElement("span")
  var listener

  div.className = "testClass-div--listener"
  span.className = "testClass-span--listener"

  div.appendChild(span)
  document.body.appendChild(div)

  listener = createListener.call(fakeView, document.body, null, "foo")
  listener(fakeEventObject)
  test.end()

})

tape("createListener (selector)", function(test){

  var div = document.createElement("div")
  var span = document.createElement("span")
  var fakeEventObject = {
    target : span
  }
  var fakeView = {
    foo : function(eventObject, target){
      test.equal(fakeView, this, "passes view as thisValue")
      test.equal(target, div, "passes target")
      test.equal(eventObject, fakeEventObject, "passes eventObject")
    }
  }
  var listener

  div.className = "testClass-div--listener"
  span.className = "testClass-span--listener"

  div.appendChild(span)
  document.body.appendChild(div)

  listener = createListener.call(fakeView, document.body, ".testClass-div--listener", "foo")
  listener(fakeEventObject)
  test.end()

})
