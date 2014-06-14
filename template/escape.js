var htmlChars = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&quot;",
  "\"": "&#39;"
}
var keys = Object.keys(htmlChars)
var regExp = RegExp("[" + keys.join("") + "]", "g")

function escapeHTML(match) {
  return htmlChars[match]
}

module.exports = function(string){
  if(string == null) {
    return ""
  }
  return String(string).replace(regExp, escapeHTML)
}
