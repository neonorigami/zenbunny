var CocoonJS = {};

(function() {
    CocoonJS.Audio= function() {
        return this;
    };

    CocoonJS.Audio.prototype= {

        audio   : null,

        setAudio : function( audio ) {
            this.audio= audio;
            this.audio.load();
            return this;
        },

        loop : function( loop ) {
            return this;
        },

        play : function() {
            //var volume = Math.random();
            //console.log("volume = " + volume);
            this.audio.volume = 0.5;

            this.audio.play();
            return this;
        },

        pause : function() {
            this.audio.pause();
            return this;
        }

    };

})();

(function() {
    CocoonJS.Music= function() {
        return this;
    };

    CocoonJS.Music.prototype= {

        audio   : null,

        setAudio : function( audio ) {
            this.audio= audio;
            this.audio.load();
            this.audio.addEventListener(
                'ended',
                function(audioEvent) {
                    audioEvent.target.playing= false;
                    console.log("Audio ends playing.");
                },
                false
            );
            return this;
        },

        loop : function( ) {
            if ( !this.audio) {
                console.log("audio not present.");
                return;
            }

            this.audio.loop= !this.audio.loop;
            return this;
        },

        play : function() {

            if ( !this.audio) {
                console.log("audio not present.");
                return;
            }

            if ( this.audio.playing ) {
                return;
            }
            this.audio.playing= true;

            //var volume = Math.random();
            //console.log("volume = " + volume);
            //this.audio.volume = volume;

            this.audio.play();


            return this;
        },

        pause : function() {
            if ( !this.audio) {
                console.log("audio not present.");
                return;
            }
            this.audio.pause();
            this.audio.playing= false;
            return this;
        }

    };

})();

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(window.innerWidth,window.innerHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

// create a texture from an image path
var texture = PIXI.Texture.fromImage("bunny.png");



var pointerDown = function(x,y){
    var p = {x: x,y: y}

    EventHandler.triggerGlobalEvent("onclick",p);

    animals.push(bunny);
};

if(navigator.isCocoonJS){
    renderer.view.addEventListener("touchstart", function(e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        pointerDown(x,y);
    },false);
}
else {
    renderer.view.addEventListener("mousedown", function(e) {
        var x = e.clientX;
        var y = e.clientY;
        pointerDown(x,y);
    },false);
}

var Controller = new SimulationObject({},[
    new Behavior([
        new State([
            new EventHandler("onclick",function(simObject,point){
                //instantiate bunny
                var b = new SimulationObject({x:point.x,y:point.y},[
                    new Behavior([
                        new State([
                            new EventHandler("awake",function(simObject){
                                var bunny = new PIXI.Sprite(texture);
                                // center the sprites anchor point
                                bunny.anchor.x = 0.5;
                                bunny.anchor.y = 0.5;
                                // move the sprite t the center of the screen
                                bunny.position.x = simObject.x;
                                bunny.position.y = simObject.y;
                                simObject.node = bunny;
                                stage.addChild(bunny);
                            }),
                            new EventHandler("update",function(simObject){
                                simObject.node.rotation += 0.1;
                            })
                        ])
                    ])
                ]);

                //play sound calling through some sound interface
                if(navigator.isCocoonJS){
                    var s01= new Audio();
                    s01.src= "gong.ogg";
                    var c = new CocoonJS.Audio();
                    c.setAudio(s01);
                    c.play();
                }
                else {
                    new Howl({
                        urls: ['gong.ogg','gong.mp3']
                    }).play();
                }
            })
        ])
    ])
]);


/*

Controller:
"onclick"
    create("Bunny",{x:e.x},{y:e.y})
    playSound(["gong.ogg","gong.mp3"])

 Bunny:
"update"
    simObject.node.rotation += 0.1;
*/


function animate() {

    requestAnimFrame( animate );

    EventHandler.triggerGlobalEvent("update",1/60);

    // render the stage
    renderer.render(stage);
}