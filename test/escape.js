var tape = require("tape")
  , esc = require("../template/escape")

tape("escape", function(test){

  var escaped = esc("<div class='foo' id=\"bar\">&</div>")
    , expected = "&lt;div class=&quot;foo&quot; id=&#39;bar&#39;&gt;&amp;&lt;/div&gt;"

  test.equal(escaped, expected)
  test.equal(esc(1), "1", "accepts numbers")
  test.equal(esc(null), "", "ignores null")
  test.equal(esc(void 0), "", "ignores undefined")
  test.end()

})
