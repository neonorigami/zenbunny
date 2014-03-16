Prefab.create("StartScreen").withBehavior()
    .withState()
    .withEventHandler("awake",function(context){// create a texture from an image path
        var texture = PIXI.Texture.fromImage("start.gif");
        var title = new PIXI.Sprite(texture);
        title.position.x = 0;
        title.position.y = 0;
        stage.addChild(title);
        context.setProperty("node",title);
    })
    .withEventHandler("destroy",function(context,args){
        stage.removeChild(context.getProperty("node"));
    })
    .withEventHandler("keydown",function(context,args){
        context.destroy();
        SimulationObject.instantiate("Game");
    })
    .withEventHandler("mousedown",function(context,args){
        context.destroy();
        SimulationObject.instantiate("Game");
    });

SimulationObject.instantiate("StartScreen");

Prefab.create("Game").withBehavior()
    .withState("start")
    .withEventHandler("awake",function(context){
        SimulationObject.instantiate("Player",{x:50,y:100});
        SimulationObject.instantiate("Bunny",{x:700,y:100});
        SimulationObject.instantiate("Bunny",{x:800,y:100});
        SimulationObject.instantiate("Bunny",{x:700,y:200});
        SimulationObject.instantiate("Bunny",{x:800,y:200});
    })

Prefab.create("Bunny").withBehavior()
    .withState("start")
    .withEventHandler("awake",function(context){
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("bunny.png");
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
    .withEventHandler("destroy",function(context,args){
        stage.removeChild(context.getProperty("node"));
    })

Prefab.create("Bullet").withBehavior()
    .withState("start")
    .withEventHandler("awake",function(context){
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("bullet.gif");
        var bunny = new PIXI.Sprite(texture);
        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        // move the sprite t the center of the screen
        bunny.position.x = context.getProperty("x");
        bunny.position.y = context.getProperty("y");
        bunny.scale.x = .1;
        bunny.scale.y = .1;
        stage.addChild(bunny);
        context.setProperty("node",bunny);
    })
    .withEventHandler("update",function(context,args){
        var a = context.getProperty("node");
        a.position.x += 10;
        var bunnies = context.getInstancesOfPrefab("Bunny");
        for(var i in bunnies){
            var p = bunnies[i].getProperty("node");
            if(Math.sqrt((p.x- a.x)*(p.x- a.x)+(p.y- a.y)*(p.y- a.y))<20){
                bunnies[i].destroy();
                context.destroy();
                return;
            }
        }
    })
    .withEventHandler("destroy",function(context,args){
        stage.removeChild(context.getProperty("node"));
    })


Prefab.create("Player").withBehavior()
    .withState("start")
    .withEventHandler("awake",function(context){
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("ship.png");
        var bunny = new PIXI.Sprite(texture);
        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        // move the sprite t the center of the screen
        bunny.position.x = context.getProperty("x");
        bunny.position.y = context.getProperty("y");
        bunny.rotation = Math.PI/2;
        stage.addChild(bunny);
        context.setProperty("node",bunny);
    })
    .withEventHandler("keydown",function(context,args){
        if(args.keyCode == 40){
            context.setProperty("speed",10);
        }
        else if(args.keyCode == 38){
            context.setProperty("speed",-10);
        }
        else if(args.keyCode == 32){
            var p = context.getProperty("node");
            SimulationObject.instantiate("Bullet",{x: p.position.x+20,y: p.position.y});
        }
    })
    .withEventHandler("keyup",function(context,args){
        if(args.keyCode == 40 || args.keyCode == 38){
            context.setProperty("speed",0);
        }
    })
    .withEventHandler("update",function(context,args){
        context.getProperty("node").position.y += context.getProperty("speed");
    })

