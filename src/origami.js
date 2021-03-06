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




var pointerDown = function(x,y){
    var p = {x: x,y: y}

    SimulationObject.triggerGlobalEvent("mousedown",p);
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
    document.addEventListener("keydown", function(e){
        SimulationObject.triggerGlobalEvent("keydown", e);
    },false);
    document.addEventListener("keyup", function(e){
        SimulationObject.triggerGlobalEvent("keyup", e);
    },false);
}

var Game = {
    playSound : function(sound){
        //play sound calling through some sound interface
        if(navigator.isCocoonJS){
            var s01= new Audio();
            s01.src= sound[0];
            var c = new CocoonJS.Audio();
            c.setAudio(s01);
            c.play();
        }
        else {
            new Howl({
                urls: sound
            }).play();
        }
    }
};

function animate() {

    requestAnimFrame( animate );

    SimulationObject.triggerGlobalEvent("update",1/60);

    // render the stage
    renderer.render(stage);
}