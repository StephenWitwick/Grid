var player = document.getElementById('player');
var playerX = 0, playerY = 0;
var a=0,d=0,w=0,s=0;
var priorPlayerHeading;
var currentPlayerHeading = 'none';
var playerLeftCooldown = 0, playerRightCooldown = 0, playerUpCooldown = 0, playerDownCooldown = 0;
var isPlayerMoving = 0;
var playerMovementPerFrame = 1/10, playerMotionIndex = 0;

function loadPlayerPosition(){
    playerX = Math.round(100*playerX)/100;
    playerY = Math.round(100*playerY)/100
    uploadTileMap(Math.floor(playerX),Math.floor(playerY),3);
    uploadTileMap(Math.floor(playerX),Math.ceil(playerY),3);
    uploadTileMap(Math.ceil(playerX),Math.floor(playerY),3);
    uploadTileMap(Math.ceil(playerX),Math.ceil(playerY),3);
};

function playerMovementCooldown(){
    if(currentPlayerHeading == 'left'){
        playerLeftCooldown = (1000 / game.fps) * 0.8 / playerMovementPerFrame;
        currentPlayerHeading = 'none';
        setTimeout(clearPlayerMovementCooldown,playerLeftCooldown);
    }
    if(currentPlayerHeading == 'right'){
        playerRightCooldown = (1000 / game.fps) * 0.8 / playerMovementPerFrame;
        currentPlayerHeading = 'none';
        setTimeout(clearPlayerMovementCooldown,playerRightCooldown);
    }
    if(currentPlayerHeading == 'up'){
        playerUpCooldown = (1000 / game.fps) * 0.8 / playerMovementPerFrame;
        currentPlayerHeading = 'none';
        setTimeout(clearPlayerMovementCooldown,playerUpCooldown);
    }
    if(currentPlayerHeading == 'down'){
        playerDownCooldown = (1000 / game.fps) * 0.8 / playerMovementPerFrame;
        currentPlayerHeading = 'none';
        setTimeout(clearPlayerMovementCooldown,playerDownCooldown);
    }
};
function clearPlayerMovementCooldown(){
    playerLeftCooldown=0
    playerRightCooldown=0
    playerUpCooldown=0
    playerDownCooldown=0
};
function playerLeft(){
    currentPlayerHeading = 'left';
    playerMotionIndex = 1 / playerMovementPerFrame;
};
function playerRight(){
    currentPlayerHeading = 'right';
    playerMotionIndex = 1 / playerMovementPerFrame;
};
function playerUp(){
    currentPlayerHeading = 'up';
    playerMotionIndex = 1 / playerMovementPerFrame;
};
function playerDown(){
    currentPlayerHeading = 'down';
    playerMotionIndex = 1 / playerMovementPerFrame;
};
function currentPlayerMotion(){
    if(playerMotionIndex >= 1){
        isPlayerMoving = 1;
    }
    else{
        isPlayerMoving = 0;
        if(currentPlayerHeading != 'none'){
            playerMovementCooldown();
        }
    }
    if(currentPlayerHeading == 'left'){
        playerX -= playerMovementPerFrame;
        playerMotionIndex -= 1;
    }
    else if(currentPlayerHeading == 'right'){
        playerX += playerMovementPerFrame;
        playerMotionIndex -= 1;
    }
    else if(currentPlayerHeading == 'up'){
        playerY += playerMovementPerFrame;
        playerMotionIndex -= 1;
    }
    else if(currentPlayerHeading == 'down'){
        playerY -= playerMovementPerFrame;
        playerMotionIndex -= 1;
    }
};
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) {a=1;}
    if(event.keyCode == 68) {d=1;}
    if(event.keyCode == 87) {w=1;}
    if(event.keyCode == 83) {s=1;}
});
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 65) {a=0;}
    if(event.keyCode == 68) {d=0;}
    if(event.keyCode == 87) {w=0;}
    if(event.keyCode == 83) {s=0;}
});
function playerMotion(){
    currentPlayerMotion();
    player.style.left = `${(1/16) * gameWidth * playerX + (7/16) * gameWidth}px`;
    player.style.bottom = `${(1/12) * gameHeight * playerY - (1/3) * gameHeight}px`;
    
    if(a == 1 && playerX >= -6 && isPlayerMoving == 0 && playerLeftCooldown == 0){
        playerLeft();
        isPlayerMoving = 1;
    }
    if(d == 1 && playerX <= 6 && isPlayerMoving == 0 && playerRightCooldown == 0){
        playerRight();
        isPlayerMoving = 1;
    }
    if(w == 1 && playerY <= 3 && isPlayerMoving == 0 && playerUpCooldown == 0){
        playerUp();
        isPlayerMoving = 1;
    }
    if(s == 1 && playerY >= -3 && isPlayerMoving == 0 && playerDownCooldown == 0){
        playerDown();
        isPlayerMoving = 1;
    }
};
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
    player.style.width = `${gameWidth/16}px`
    player.style.height = `${gameHeight/12}px`
};