var Behavior = function(states){
    this.states = states;
}

Behavior.prototype.addState = function(state){
    state.behavior = this;
    this.states.push(state);
}

Behavior.prototype.getStateByName = function(name){
    for(var i in this.states){
        if(this.states[i].name == name){
            return this.states[i];
        }
    }
    return null;
}


Behavior.prototype.getStartState = function() {
    return this.states[0];
}