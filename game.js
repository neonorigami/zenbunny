Prefab.create("Bunny").withBehavior()
    .withState("start")
    .withEventHandler("awake",function(context){
        var bunny = new PIXI.Sprite(texture);
        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        // move the sprite t the center of the screen
        bunny.position.x = context.getProperty("x");
        bunny.position.y = context.getProperty("y");
        stage.addChild(bunny);
        context.setProperty("node",bunny);
    })
    .withEventHandler("step",function(context,args){
        context.getProperty("node").x += Math.random()*100-50;
        context.getProperty("node").y += Math.random()*100-50;
    });

SimulationObject.instantiate("Bunny",{x:100,y:100})
SimulationObject.instantiate("Bunny",{x:200,y:100})
SimulationObject.instantiate("Bunny",{x:100,y:200})
SimulationObject.instantiate("Bunny",{x:200,y:200})

Prefab.create("Player").withBehavior()
    .withState("start")
    .withEventHandler("keydown",function(context,args){
        SimulationObject.triggerGlobalEvent("step",{x:args.x,y:args.y, player: context.simObj});
    })

SimulationObject.instantiate("Player")