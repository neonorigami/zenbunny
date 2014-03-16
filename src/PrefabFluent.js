var PrefabFluent = function(prefab){
    this.prefab = prefab;
}

PrefabFluent.prototype.withProperty = function( name, value ) {
    this.prefab.setProperty( name, value );
    return this;
}

PrefabFluent.prototype.withBehavior = function( name ){
    var beh = new Behavior(name, []);
    this.prefab.behaviors[name] = beh;
    this.currentBehavior= beh;
    return this;
}

PrefabFluent.prototype.withState = function(name){
    var state = new State(name,[]);
    this.currentBehavior.addState(state);
    this.currentState = state;
    return this;
}

PrefabFluent.prototype.withEventHandler = function(channel,handler){
    this.currentState.eventHandlers.push(new EventHandler(channel,handler));
    return this;
}