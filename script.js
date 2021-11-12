var game = {}; 
fps = 90;

var game = document.getElementById('game');
var gameAspectRatio = 4/3;
var gameWidth, gameHeight;

var stage = document.getElementById('stage');

function scale(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    if(w/h > gameAspectRatio){
        gameWidth = h*gameAspectRatio;
        gameHeight = h;
    }
    else{
        gameWidth = w;
        gameHeight = w/gameAspectRatio;
    }
    game.style.width = `${gameWidth}px`;
    game.style.height = `${gameHeight}px`;
    player.style.width = `${gameWidth/16}px`;
    player.style.height = `${gameHeight/12}px`;

    for (let i = 0; i < allNonplayerEntities.length; i++){
        let index = allNonplayerEntities[i];
        index.width = gameWidth/16;
        index.height = gameHeight/12;
    }
    
};

game.run = function() {
    playerMotion();
    scale();
};

game._intervalId = setInterval(game.run, 1000 / fps);
