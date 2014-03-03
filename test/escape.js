var tape = require("tape")
  , esc = require("../template/escape")

tape("escape", function(test){

  var escaped = esc("<div class='foo' id=\"bar\">&</div>")
    , expected = "&lt;div class=&quot;foo&quot; id=&#39;bar&#39;&gt;&amp;&lt;/div&gt;"

  test.equal(escaped, expected)
  test.end()

})
