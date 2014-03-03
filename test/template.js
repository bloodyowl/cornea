var tape = require("tape")
  , template = require("../template")

tape("template", function(test){

  test.equal(template("foo"), "foo")
  test.equal(template("foo #{*}"), "foo ")
  test.equal(template("foo #{*}", "bar"), "foo bar")
  test.equal(template("foo #{*} #{*}", "bar"), "foo bar bar")
  test.end()

})
