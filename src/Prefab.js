var Prefab = function(behaviors,props){
    //set properties
    if(props){
        for(var i in props){
            this[i] = props[i];
        }
    }
    this.behaviors = behaviors;
}

Prefab.Prefabs = {};

Prefab.create = function(name,props){
    var prefab = new Prefab([],props);
    Prefab.Prefabs[name] = prefab;
    return new PrefabFluent(prefab);
}
