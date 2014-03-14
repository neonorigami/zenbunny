var Behavior = function(states){
    this.states = states;
    this.currentState = states[0];
}

Behavior.prototype.init = function(simObject) {
    this.simObject = simObject;
    this.currentState.init(this);
    this.currentState.enter();
};