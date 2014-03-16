var EventContext = function(simObj,behavior){
    this.simObj = simObj;
    this.behavior = behavior;
}

EventContext.prototype.setProperty = function(n,v){
    this.simObj.setProperty(n,v);
}

EventContext.prototype.getProperty = function(n){
    return this.simObj.getProperty(n);
}

EventContext.prototype.changeState = function(state){
    for(var i in EventHandler.Channels){
        var toRemove = [];
        for(var j in EventHandler.Channels[i]){
            var def = EventHandler.Channels[i][j];
            if(def.simObject == this.simObj && def.context.behavior == this.behavior){
                toRemove.push(def);
            }
        }
        for(var j in toRemove){
            var ix = EventHandler.Channels[i].indexOf(toRemove[j]);
            EventHandler.Channels[i].splice(ix,1);
        }
    }
    this.behavior.getStateByName(state).enter(this.simObj);
}

EventContext.prototype.getInstancesOfPrefab = function(name){
    var p = Prefab.Prefabs[name];
    var instances = [];
    for(var i in SimulationObject.Instances){
        if(SimulationObject.Instances[i].prefab == p){
            instances.push(SimulationObject.Instances[i]);
        }
    }
    return instances;
}

EventContext.prototype.destroy = function(){
    this.simObj.destroy();
}