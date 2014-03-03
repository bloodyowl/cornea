var templateRE = /#\{\*\}/g

module.exports = function(template, data){
  if(data == null) {
    data = ""
  }
  return template.replace(templateRE, data)
}
