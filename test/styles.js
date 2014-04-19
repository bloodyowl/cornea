var tape = require("tape")
  , styles = require("../styles")

tape("styles", function(test){

  var style = styles.create()
    , head = document.head || document.getElementsByTagName("head")[0]
    , rule
    , div = document.createElement("div")
    , element = style.element

  test.equal(style.element.nodeName, "STYLE", "created stylesheet")
  test.equal(style.element.parentNode, head, "inserted stylesheet")
  rule = style.createRule(".foo")
  test.equal(rule.selectorText, ".foo", "creates rules")
  test.equal(style.element.sheet.cssRules[0].selectorText, ".foo", "rule assimilated")
  test.equal(style._selectors[".foo"], 0, "rule stored")
  test.equal(style.getRule(".foo"), rule, "rule fetched")
  test.equal(style.getRule(" .foo   "), rule, "trimmed rule fetched")
  style.setStyle(".foo", {
    "font-size" : "45px"
  })
  div.className = "foo"
  document.body.appendChild(div)
  test.equal(getComputedStyle(div, null).getPropertyValue("font-size"), "45px")
  test.equal(style.getRule(".bar"), null, "not found")

  style.setStyle(".baz", {
    "font-size" : "45px"
  })
  test.equal(style.getRule(".baz").selectorText, ".baz", "creates rule if not found")

  test.doesNotThrow(function(){
    style.setStyle(".baz")
  })

  style.setStyle(".foo", {
    "font-size" : null
  })
  test.equal(getComputedStyle(div, null).getPropertyValue("font-size"), "16px", "resets if null as value")
  style.setStyle(".foo", {
    "font-size" : "45px"
  })
  style.destroy()
  test.equal(element.parentNode, null)
  test.equal(style.element, null)
  test.equal(getComputedStyle(div, null).getPropertyValue("font-size"), "16px", "resets styles when ended")
  style.create()
  test.notEqual(style.element, element, "changed element")
  test.end()

})
