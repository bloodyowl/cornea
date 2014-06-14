var tape = require("tape")
  , binding = require("../binding")
  , view = {data:{foo:"test"}}
tape("binding.toString", function(test){
  
  var b = binding.create(view, "foo")
    , b1 = b.toString()
    , b2 = b.toString({nodeName:"span"})

  test.notEqual(b1.indexOf("class=\"cornea-binding\""), -1)
  test.notEqual(b1.indexOf("data-cornea-binding=\"innerHTML\""), -1)
  test.notEqual(b1.indexOf("data-cornea-key=\"foo\""), -1)
  test.notEqual(b1.indexOf("data-cornea-template=\"#{*}\""), -1)
  test.notEqual(b1.indexOf("data-cornea-escape"), -1)
  test.notEqual(b2.indexOf("span"), -1)
  test.notEqual(b2.indexOf("span", b2.indexOf("span")), -1)
  test.notEqual(b2.indexOf("test"), -1)
  test.end()

})

tape("binding.toNode", function(test){

  var b = binding.create(view, "foo")
    , b1 = b.toNode()

  test.equal(b1.nodeName, "SPAN", "gets default nodeName")
  test.equal(b1.className, "cornea-binding", "sets className")
  test.equal(b1.getAttribute("data-cornea-binding"), "innerHTML", "sets binding")
  test.equal(b1.getAttribute("data-cornea-key"), "foo", "sets key")
  test.equal(b1.getAttribute("data-cornea-template"), "#{*}", "sets default template")
  test.equal(b1.hasAttribute("data-cornea-escape"), true, "is escaped by default")
  test.equal(b1.innerHTML, "test")
  test.end()

})

tape("binding.toNode (extend)", function(test){

  var b = binding.create(view, "foo")
    , b1 = b.toNode({
        nodeName:"span",
        attributes:{"data-foo":"bar"},
        className:"foo bar",
        template:"it is #{*}",
        escape:false
      })

  test.equal(b1.nodeName, "SPAN", "gets default nodeName")
  test.equal(b1.className, "cornea-binding foo bar", "sets className with custom ones")
  test.equal(b1.getAttribute("data-foo"), "bar", "sets custom attributes")
  test.equal(b1.getAttribute("data-cornea-binding"), "innerHTML", "sets binding")
  test.equal(b1.getAttribute("data-cornea-key"), "foo", "sets key")
  test.equal(b1.getAttribute("data-cornea-template"), "it is #{*}", "sets custom template")
  test.equal(b1.hasAttribute("data-cornea-escape"), false, "custom escape")
  test.equal(b1.innerHTML, "it is test", "content")
  test.end()

})

tape("binding.bindAttribute", function(test){

  var b = binding.create(view, "foo")
    , node = document.createElement("div")

  b.bindAttribute(node, "data-value")
  test.equal(node.className, "cornea-binding", "sets className")
  test.equal(node.getAttribute("data-cornea-binding"), "data-value", "sets binding")
  test.equal(node.getAttribute("data-cornea-key"), "foo", "sets key")
  test.equal(node.getAttribute("data-cornea-template"), "#{*}", "sets template")
  test.equal(node.hasAttribute("data-cornea-escape"), true, "escape")
  test.equal(node.getAttribute("data-value"), "test", "content")
  test.end()

})

tape("binding.bindAttribute (extend)", function(test){

  var b = binding.create(view, "foo")
    , node = document.createElement("div")

  b.bindAttribute(node, "data-value", {template:"foo #{*}", escape:false})
  test.equal(node.className, "cornea-binding", "sets className")
  test.equal(node.getAttribute("data-cornea-binding"), "data-value", "sets binding")
  test.equal(node.getAttribute("data-cornea-key"), "foo", "sets key")
  test.equal(node.getAttribute("data-cornea-template"), "foo #{*}", "sets custom template")
  test.equal(node.hasAttribute("data-cornea-escape"), false, "custom escape")
  test.equal(node.getAttribute("data-value"), "foo test", "sets custom template")
  test.end()

})
