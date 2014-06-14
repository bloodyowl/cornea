var tape = require("tape")
var cornea = require("..")

tape("hooks create", function(test){
  cornea
    .create()
    .on("create", function(){
      test.pass("create")
      test.end()
    })
})

tape("hooks render", function(test){
  var view = cornea.create()
  var index = -1
  view.on("beforeRender", function(){
    test.equal(++index, 0)
  })
  view.on("afterRender", function(){
    test.equal(++index, 1)
    test.end()
  })
  view.render()
})

tape("hooks update", function(test){
  var view = cornea.create()
  var index = -1
  view.on("beforeUpdate", function(){
    test.equal(++index, 0)
  })
  view.on("afterUpdate", function(){
    test.equal(++index, 1)
    test.end()
  })
  view.update({
    foo : "bar"
  })
})

tape("hooks style", function(test){
  var view = cornea.create()
  var index = -1
  view.on("styleChange", function(){
    test.equal(++index, 0)
    test.end()
  })
  view.setStyle(".foo", {opacity: 0})
})
