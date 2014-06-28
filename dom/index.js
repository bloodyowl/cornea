var DOM = {}
var setProperty = require("./set-property")
var nodeNames = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "defs",
  "ellipse",
  "g",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
]

function createTree(element, args){
  var index = 0
  var length = args.length
  var item
  while(++index < length) {
    item = args[index]
    if(item == null) {
      continue
    }
    if(item.nodeType) {
      element.appendChild(item)
      continue
    }
    if(Array.isArray(item)) {
      createTree(element, [null].concat(item))
      continue
    }
    if(typeof item == "function") {
      createTree(element, [null].concat(item()))
      continue
    }
    if(typeof item == "string") {
      element.appendChild(document.createTextNode(item))
    }
  }
}

nodeNames.forEach(function(nodeName){
  DOM[nodeName] = function(properties){
    var element = document.createElement(nodeName)
    var property
    var key
    for(key in properties) {
      if(!properties.hasOwnProperty(key)) {
        continue
      }
      property = properties[key]
      if(typeof property == "function") {
        setProperty(element, key, property(element, key))
        continue
      }
      setProperty(element, key, properties[key])
    }
    createTree(element, arguments)
    return element
  }
})

module.exports = DOM
