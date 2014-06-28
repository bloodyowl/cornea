module.exports = function(object, source){
  if(!source) {
    return object
  }
  Object.keys(source)
    .forEach(function(key){
      object[key] = source[key]
    })
  return object
}
