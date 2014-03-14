var State = function(eventHandlers){
    this.eventHandlers = eventHandlers;
}

State.prototype.init = function(behavior){
    this.behavior = behavior;
    for(var i in this.eventHandlers){
        this.eventHandlers[i].init(this);
    }
}

State.prototype.enter = function(){
    for(var i in this.eventHandlers){
        EventHandler.addToChannel(this.eventHandlers[i].channel,this.eventHandlers[i]);
    }
}

State.prototype.triggerEvent = function(channel,simObj,arg){
    for(var i in this.eventHandlers){
        if(this.eventHandlers[i].channel == channel){
            this.eventHandlers[i].handler.call(null,simObj,arg);
        }
    }
}