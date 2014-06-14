var tape = require("tape")
var styles = require("../styles")

tape("styles", function(test){

  var style = styles.create({id:1})
  var head = document.head || document.getElementsByTagName("head")[0]
  var rule
  var rule2
  var div = document.createElement("div")
  var element = style.element

  test.equal(style.element.nodeName, "STYLE", "created stylesheet")
  test.equal(style.element.parentNode, head, "inserted stylesheet")
  rule = style.createRule(".foo")
  var selectorsFoo = {
    "[data-cornea-id=\"1\"] .foo" : 1,
    "[data-cornea-id='1'] .foo" : 1
  }
  test.equal(selectorsFoo[rule.selectorText], 1, "creates rules")
  test.equal(selectorsFoo[style.element.sheet.cssRules[0].selectorText], 1, "rule assimilated")
  test.equal(style._selectors[".foo"], 0, "rule stored")
  test.equal(style.getRule(".foo"), rule, "rule fetched")
  test.equal(style.getRule(" .foo   "), rule, "trimmed rule fetched")
  style.setStyle(".foo", {
    "font-size" : "45px"
  })
  rule2 = style.createRule(".foo, .bar, #foo")
  var selectors = {
    "[data-cornea-id=\"1\"] .foo, [data-cornea-id=\"1\"] .bar, [data-cornea-id=\"1\"] #foo" : 1,
    "[data-cornea-id='1'] .foo, [data-cornea-id='1'] .bar, [data-cornea-id='1'] #foo" : 1
  }
  test.equal(selectors[rule2.selectorText], 1, "creates rules")
  test.equal(selectors[style.element.sheet.cssRules[1].selectorText], 1, "rule assimilated")

  test.doesNotThrow(function(){
    style.setStyle(".baz")
  })
  test.end()

})
