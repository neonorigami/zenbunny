var SimulationObject = function(props, behaviors){
    for(var i in props){
        this[i] = props[i];
    }
    this.behaviors = behaviors;
    for(var i in behaviors){
        behaviors[i].init(this);
    }
    for(var i in behaviors){
        behaviors[i].currentState.triggerEvent("awake",this,this);
    }
}