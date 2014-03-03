var htmlChars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&quot;",
      "\"": "&#39;"
    }
  , keys = Object.keys(htmlChars)
  , regExp = RegExp("[" + keys.join("") + "]", "g")

function escapeHTML(match) {
  return htmlChars[match]
}

module.exports = function(string){
  return string.replace(regExp, escapeHTML)
}
