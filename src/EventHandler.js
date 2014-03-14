var EventHandler = function(channel, handler){
    this.channel = channel;
    this.handler = handler;
}

EventHandler.Channels = {

}

EventHandler.addToChannel = function(channel, handler){
    if(!EventHandler.Channels[channel]){
        EventHandler.Channels[channel] = [];
    }
    EventHandler.Channels[channel].push(handler);
}

EventHandler.triggerGlobalEvent = function(channel,arg){
    var clickHandlers = EventHandler.Channels[channel];
    for(var i in clickHandlers){
        clickHandlers[i].handler.call(null,clickHandlers[i].state.behavior.simObject,arg)
    }
}

EventHandler.prototype.init = function(state){
    this.state = state;
};