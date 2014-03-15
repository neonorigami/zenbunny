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

EventHandler.prototype.activate = function(simObject,state){
    EventHandler.addToChannel(this.channel,
        {
            context: new EventContext(simObject,state.behavior),
            simObject : simObject,
            state: state,
            handler: this.handler
        }
    );
}