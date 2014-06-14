var tape = require("tape")
  , styles = require("../styles")

tape("styles", function(test){

  var style = styles.create({id:1})
    , head = document.head || document.getElementsByTagName("head")[0]
    , rule
    , rule2
    , div = document.createElement("div")
    , element = style.element

  test.equal(style.element.nodeName, "STYLE", "created stylesheet")
  test.equal(style.element.parentNode, head, "inserted stylesheet")
  rule = style.createRule(".foo")
  test.equal(rule.selectorText, "[data-cornea-id=\"1\"] .foo", "creates rules")
  test.equal(style.element.sheet.cssRules[0].selectorText, "[data-cornea-id=\"1\"] .foo", "rule assimilated")
  test.equal(style._selectors[".foo"], 0, "rule stored")
  test.equal(style.getRule(".foo"), rule, "rule fetched")
  test.equal(style.getRule(" .foo   "), rule, "trimmed rule fetched")
  style.setStyle(".foo", {
    "font-size" : "45px"
  })
  rule2 = style.createRule(".foo, .bar, #foo")
  test.equal(rule2.selectorText, "[data-cornea-id=\"1\"] .foo, [data-cornea-id=\"1\"] .bar, [data-cornea-id=\"1\"] #foo", "creates rules")
  test.equal(style.element.sheet.cssRules[1].selectorText, "[data-cornea-id=\"1\"] .foo, [data-cornea-id=\"1\"] .bar, [data-cornea-id=\"1\"] #foo", "rule assimilated")

  test.doesNotThrow(function(){
    style.setStyle(".baz")
  })
  test.end()

})
