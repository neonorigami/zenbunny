// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(window.innerWidth,window.innerHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

// create a texture from an image path
var texture = PIXI.Texture.fromImage("bunny.png");

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

var animals = [];
animals.push(bunny);

$(renderer.view).get(0).addEventListener("pointerdown", function(e) {
    var p = {x: e.clientX,y: e.clientY}
    var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
    bunny.position.x = p.x;
    bunny.position.y = p.y;

    stage.addChild(bunny);

    animals.push(bunny);
    new Howl({
        urls: ['gong.ogg','gong.mp3']
    }).play();
});

function animate() {

    requestAnimFrame( animate );

    // just for fun, let's rotate mr rabbit a little
    for(var i in animals){
        animals[i].rotation += 0.1;
    }


    // render the stage
    renderer.render(stage);
}