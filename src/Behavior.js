var Behavior = function(states){
    this.states = states;
}

Behavior.prototype.getStartState = function() {
    return this.states[0];
}