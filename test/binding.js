var tape = require("tape")
  , binding = require("../binding")

tape("binding.toString", function(test){
  
  var b = binding.create("foo")
  
  test.equal(b.toString(), "<div class=\"cornea-binding\" data-cornea-binding=\"innerHTML\" data-cornea-key=\"foo\" data-cornea-template=\"#{*}\" data-cornea-escape=\"\"></div>")
  test.equal(b.toString({nodeName:"span"}), "<span class=\"cornea-binding\" data-cornea-binding=\"innerHTML\" data-cornea-key=\"foo\" data-cornea-template=\"#{*}\" data-cornea-escape=\"\"></span>")
  test.end()
  
})

tape("binding.toNode", function(test){

  var b = binding.create("foo")
    , b1 = b.toNode()

  test.equal(b1.nodeName, "DIV", "gets default nodeName")
  test.equal(b1.className, "cornea-binding", "sets className")
  test.equal(b1.getAttribute("data-cornea-binding"), "innerHTML", "sets binding")
  test.equal(b1.getAttribute("data-cornea-key"), "foo", "sets key")
  test.equal(b1.getAttribute("data-cornea-template"), "#{*}", "sets default template")
  test.equal(b1.hasAttribute("data-cornea-escape"), true, "is escaped by default")
  test.end()

})

tape("binding.toNode (extend)", function(test){

  var b = binding.create("foo")
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
  test.end()

})
