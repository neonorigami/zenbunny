var SimulationObject = function(prefab,props){
    this.prefab = prefab;

    //copy over prefab props ( need deep copy )
    if(prefab.props){
        for(var i in prefab.props){
            this[i] = prefab.props[i];
        }
    }

    //set instance props
    if(props){
        for(var i in props){
            this[i] = props[i];
        }
    }

    //put all behaviors into their start state
    for(var i in prefab.behaviors){
        prefab.behaviors[i].getStartState().enter(this);
    }

    //call awake event only on this object
    SimulationObject.triggerEvent(this,"awake",this,null);
}

SimulationObject.Prefabs = {};

SimulationObject.Instances = [];

SimulationObject.create = function(name,behaviors){
    SimulationObject.Prefabs[name] = new SimulationObject(behaviors,null,null);
}

SimulationObject.instantiate = function(name,props){
    new SimulationObject(Prefab.Prefabs[name],props);
};


SimulationObject.triggerGlobalEvent = function(channel,arg){
    var eventDefinition = EventHandler.Channels[channel];
    for(var i in eventDefinition){
        var eventDef = eventDefinition[i];
        eventDef.handler.call(null,eventDef.context,arg)
    }
}

SimulationObject.triggerEvent = function(simObject, channel,arg){
    var eventDefinition = EventHandler.Channels[channel];
    for(var i in eventDefinition){
        var eventDef = eventDefinition[i];
        if(eventDef.simObject == simObject){
            eventDef.handler.call(null,eventDef.context,arg);
        }
    }
}

SimulationObject.prototype.getProperty = function( name ) {
    var result = null;
    if( this[name] !== undefined ) {
        result = this[name];
    }
    else if( this.prefab !== undefined && this.prefab !== null ) {
        result = this.prefab.getProperty( name );
    }

    return result;
}

SimulationObject.prototype.setProperty = function( name, value ) {
    this[name] = value;
}

