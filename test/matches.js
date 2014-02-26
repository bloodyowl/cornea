var tape = require("tape")
  , matches = require("../events/matches")

tape("matches", function(test){
  var div = document.createElement("div")
    , span = document.createElement("span")
    , i = document.createElement("i")

  div.appendChild(span)
  div.className = "testClass--div"
  document.body.className += " testClass"
  document.body.appendChild(div)
  
  test.equal(matches(document.body, div, ".testClass--div"), div, "matches div correctly")
  test.equal(matches(document.body, div, ".foobar"), false, "returns false if doesn't match")
  test.equal(matches(document.body, span, ".testClass--div"), div, "bubbles up to the right element")
  test.equal(matches(div, div, ".testClass--div"), false, "returns false if same element with selector")
  test.equal(matches(div, span, ".testClass--div"), false, "doesn't count rootElement")

  test.end()
})
