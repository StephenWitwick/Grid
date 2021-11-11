var game = {}; game.fps = 90;

var game = document.getElementById('game');
var gameAspectRatio = 4/3;
var gameWidth, gameHeight;

var stage = document.getElementById('stage');



game.run = function() {
    playerMotion();
    scale();
};

game._intervalId = setInterval(game.run, 1000 / game.fps);