var Prefab = function(behaviors,props){
    //set properties
    this.props = {};
    if(props){
        for(var i in props){
            this.props[i] = props[i];
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


Prefab.prototype.getProperty = function( name ) {
    if( this.props[name] == undefined ) return null;
    return this.props[name];
}

Prefab.prototype.setProperty = function( name, value ) {
    this.props[name] = value;
}

Prefab.ToJson = function( name ) {
    var prefab = Prefab.Prefabs[name];
    var result = {};
    result.name = name;

    result.props = {};
    for( var i in prefab.props ) {
        result.props[i] = prefab.props[i];
    }

    result.behaviors = {};
    for( var b in prefab.behaviors ) {
        result.behaviors[b] = {};
        result.behaviors[b].states = {};
        for( var s in prefab.behaviors[b].states ) {
            var stateName = prefab.behaviors[b].states[s].name;
            result.behaviors[b].states[stateName] = {};
            result.behaviors[b].states[stateName].eventHandlers = [];
            for( var e in prefab.behaviors[b].states[s].eventHandlers ) {
                var ev = prefab.behaviors[b].states[s].eventHandlers[e];
                result.behaviors[b].states[stateName].eventHandlers.push( { channel: ev.channel, handler: ev.handler.toString() } );
            }
        }
    }

    return JSON.stringify( result );
}
