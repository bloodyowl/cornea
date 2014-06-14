var escape = require("./escape")
var templateRE = /#\{\*\}/g

module.exports = function(template, data, shouldEscape){
  if(data == null) {
    data = ""
  }
  if(shouldEscape) {
    data = escape(data)
  }
  return template.replace(templateRE, data)
}
