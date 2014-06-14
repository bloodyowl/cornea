module.exports = function(object, source){
  if(!source) {
    return
  }
  Object.keys(source)
    .forEach(function(key){
      object[key] = source[key]
    })
}
