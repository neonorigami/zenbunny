var PrefabFluent = function(prefab){
    this.prefab = prefab;
}

PrefabFluent.prototype.withBehavior = function(){
    var beh = new Behavior([]);
    this.prefab.behaviors.push(beh);
    this.currentBehavior= beh;
    return this;
}

PrefabFluent.prototype.withState = function(){
    var state = new State([]);
    this.currentBehavior.states.push(state);
    this.currentState = state;
    return this;
}

PrefabFluent.prototype.withEventHandler = function(channel,handler){
    this.currentState.eventHandlers.push(new EventHandler(channel,handler));
    return this;
}