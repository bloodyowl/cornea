var tape = require("tape")
  , createListener = require("../events/createListener")

tape("createListener (no selector)", function(test){
  
  var fakeEventObject = {}
    , fakeView = {
        foo : function(eventObject, target){
          test.equal(fakeView, this, "passes view as thisValue")
          test.equal(target, document.body, "passes rootNode as target")
          test.equal(eventObject, fakeEventObject, "passes eventObject")
        }
      }
    , div = document.createElement("div")
    , span = document.createElement("span")
    , listener
  
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
    , span = document.createElement("span")
    , fakeEventObject = {
        target : span
      }
    , fakeView = {
        foo : function(eventObject, target){
          test.equal(fakeView, this, "passes view as thisValue")
          test.equal(target, div, "passes target")
          test.equal(eventObject, fakeEventObject, "passes eventObject")
        }
      }
    , listener

  div.className = "testClass-div--listener"
  span.className = "testClass-span--listener"

  div.appendChild(span)
  document.body.appendChild(div)

  listener = createListener.call(fakeView, document.body, ".testClass-div--listener", "foo")
  listener(fakeEventObject)
  test.end()

})
