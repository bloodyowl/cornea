var templateRE = /#\{\*\}/g

module.exports = function(template, data){
  return template.replace(templateRE, data)
}
