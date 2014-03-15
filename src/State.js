var State = function(name,eventHandlers){
    this.name = name;
    this.eventHandlers = eventHandlers;
}

State.prototype.enter = function(simObject){
    for(var i in this.eventHandlers){
        this.eventHandlers[i].activate(simObject,this);
    }
}

State.prototype.triggerEvent = function(channel,simObj,arg){
    for(var i in this.eventHandlers){
        if(this.eventHandlers[i].channel == channel){
            this.eventHandlers[i].handler.call(null,simObj,arg);
        }
    }
}