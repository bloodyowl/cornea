var createListener = require("./createListener")

module.exports = {
  listen : function(view){
    if(!view.events) {
      return
    }
    view.events.forEach(listen, view)
  },
  stopListening : function(view){
    if(!view.events) {
      return
    }
    view.events.forEach(stopListening, view)
  }
}

function listen(item){
  item._listener = createListener.call(this, this.element, item.selector, item.listener)
  this.element.addEventListener(item.type, item._listener, !!item.capture)
}

function stopListening(item){
  this.element.removeEventListener(item.type, item._listener, !!item.capture)
}
