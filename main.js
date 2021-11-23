var fps = 30;
var game = document.getElementById('game');
var gameAspectRatio = 4/3;
var gameWidth, gameHeight;
let loophole1 = document.getElementsByTagName('canvas')
var canvas = loophole1.namedItem('canvas');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
var timeA,timeB,timeDelta;
let dpi = devicePixelRatio;
var currentRoom = 1;
var tilesInRow1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow7 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow8 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var enemyList = [];

const rooms = [
    {
        barriers: {
            row1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            row2: [0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
            row3: [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
            row4: [0,0,1,0,0,1,0,0,0,0,0,1,0,0,0],
            row5: [0,0,1,0,1,1,0,0,0,0,0,1,1,1,0],
            row6: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            row7: [0,0,1,1,1,0,1,1,1,1,1,0,0,0,0],
            row8: [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
            row9: [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0]
        },
        tile: {
    
        },
        enemy: [
            {
                info: {
                    id: 1,
                    type: 'warrior',
                    tier: 1
                },
                state: {
                    x: 6,
                    y: 0,
                    heading: 'none',
                    movementIndex: 0,
                    rightCooldown: 0,
                    leftCooldown: 0,
                    upCooldown: 0,
                    downCooldown: 0,
                    moveCooldownIndex: 0,
                    rightBlocked: true,
                    leftBlocked: true,
                    upBlocked: true,
                    downBlocked: true,
                    attackDirection: 'none',
                    attackCooldown: 0,
                    hp: 100,
                    mana: 100,
                },
                stats: {
                    character: {
                        hpRegen: 1,
                        manaRegen: 1,
                        strength: 1,
                        dexterity: 1,
                        constitution: 1,
                        speed: 4,
                    },
                    weapon: {
                        piercing: 0,
                        cleaving: 0,
                        impact: 0,
                        wieldiness: 0,
                    },
                    armor: {
                        rigid: 0,
                        composite: 0,
                        compliant: 0,
                        thermal: 0,
                    }
                },
                render: function(){
                    renderEntity(this.state.x,this.state.y,'Character_Textures/amber_tier_1.png');
                },
                moveCooldown: function(delay){
                    this.state.moveCooldownIndex = delay / fps;
                },
                moveRight: function(){
                    if(this.state.rightCooldown != 0){return;}
                    this.state.heading = 'right';
                    this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
                },
                moveLeft: function(){
                    if(this.state.leftCooldown != 0){return;}
                    this.state.heading = 'left';
                    this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
                },
                moveUp: function(){
                    if(this.state.upCooldown != 0){return;}
                    this.state.heading = 'up';
                    this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
                },
                moveDown: function(){
                    if(this.state.downCooldown != 0){return;}
                    this.state.heading = 'down';
                    this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
                },
                motion: function(){
                    if(this.state.moveCooldownIndex > 0){
                        this.state.moveCooldownIndex -= 1;
                    }
                    else{
                        this.state.moveCooldownIndex = 0;
                        this.state.rightCooldown = 0;
                        this.state.leftCooldown = 0;
                        this.state.upCooldown = 0;
                        this.state.downCooldown = 0;
                    }
                    if(this.state.movementIndex == 0){
                        this.state.x = Math.round(this.state.x);
                        this.state.y = Math.round(this.state.y);
                        if(this.state.heading != 'none'){
                            if(this.state.heading == 'right'){
                                this.state.rightCooldown = (1000 / fps) * 0.8 / frameMotion(this.stats.character.speed);
                                this.state.heading = 'none';
                                this.moveCooldown(this.state.rightCooldown);
                            }
                            else if(this.state.heading == 'left'){
                                this.state.leftCooldown = (1000 / fps) * 0.8 / frameMotion(this.stats.character.speed);
                                this.state.heading = 'none';
                                this.moveCooldown(this.state.leftCooldown);
                            }
                            else if(this.state.heading == 'up'){
                                this.state.upCooldown = (1000 / fps) * 0.8 / frameMotion(this.stats.character.speed);
                                this.state.heading = 'none';
                                this.moveCooldown(this.state.upCooldown);
                            }
                            else if(this.state.heading == 'down'){
                                this.state.downCooldown = (1000 / fps) * 0.8 / frameMotion(this.stats.character.speed);
                                this.state.heading = 'none';
                                this.moveCooldown(this.state.downCooldown);
                            }
                        }
                    }
                    if(this.state.heading == 'right'){
                        this.state.x += frameMotion(this.stats.character.speed);
                        this.state.movementIndex -= 1;
                    }
                    else if(this.state.heading == 'left'){
                        this.state.x -= frameMotion(this.stats.character.speed);
                        this.state.movementIndex -= 1;
                    }
                    else if(this.state.heading == 'up'){
                        this.state.y += frameMotion(this.stats.character.speed);
                        this.state.movementIndex -= 1;
                    }
                    else if(this.state.heading == 'down'){
                        this.state.y -= frameMotion(this.stats.character.speed);
                        this.state.movementIndex -= 1;
                    }
                },
                uploadPosition: function(){
                    uploadTileMap(Math.floor(this.state.x),Math.floor(this.state.y),4);
                    uploadTileMap(Math.floor(this.state.x),Math.ceil(this.state.y),4);
                    uploadTileMap(Math.ceil(this.state.x),Math.floor(this.state.y),4);
                    uploadTileMap(Math.ceil(this.state.x),Math.ceil(this.state.y),4);
                },
                activateWalls: function(){
                    if(this.state.heading == 'right'){
                        if(checkOccupiedTile(Math.ceil(this.state.x),Math.round(this.state.y)) == undefined){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.ceil(this.state.x),Math.round(this.state.y)) == 1){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.ceil(this.state.x),Math.round(this.state.y)) == 3){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                    }
                    else if(this.state.heading == 'left'){
                        if(checkOccupiedTile(Math.floor(this.state.x),Math.round(this.state.y)) == undefined){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.floor(this.state.x),Math.round(this.state.y)) == 1){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.floor(this.state.x),Math.round(this.state.y)) == 3){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                    }
                    else if(this.state.heading == 'up'){
                        if(checkOccupiedTile(Math.round(this.state.x),Math.ceil(this.state.y)) == undefined){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.round(this.state.x),Math.ceil(this.state.y)) == 1){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.round(this.state.x),Math.ceil(this.state.y)) == 3){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                    }
                    else if(this.state.heading == 'down'){
                        if(checkOccupiedTile(Math.round(this.state.x),Math.floor(this.state.y)) == undefined){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.round(this.state.x),Math.floor(this.state.y)) == 1){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                        else if(checkOccupiedTile(Math.round(this.state.x),Math.floor(this.state.y)) == 3){
                            this.state.x = Math.round(this.state.x);
                            this.state.y = Math.round(this.state.y);
                        }
                    }
                },
                moveTowardPlayer: function(){
                    if(this.state.heading != 'none'){
                        return;
                    }
                    let relativeX = player.state.x - this.state.x;
                    let relativeY = player.state.y - this.state.y;
                    let idealHeading1, idealHeading2;
                    let rightOpen = true;
                    let leftOpen = true
                    let upOpen = true;
                    let downOpen = true;

                    if(relativeX > 0){
                        idealHeading1 = 'right';
                    }
                    else{idealHeading1 = 'left';}

                    if(relativeY > 0){
                        if(Math.abs(relativeY) > Math.abs(relativeX)){
                            idealHeading2 = idealHeading1;
                            idealHeading1 = 'up';
                        }
                        else{idealHeading2 = 'up';}
                    }
                    else{
                        if(Math.abs(relativeY) > Math.abs(relativeX)){
                            idealHeading2 = idealHeading1;
                            idealHeading1 = 'down';
                        }
                        else{idealHeading2 = 'down';}
                    }

                    if(checkOccupiedTile(this.state.x + 1, this.state.y) == 1){rightOpen = false;}
                    if(checkOccupiedTile(this.state.x - 1, this.state.y) == 1){leftOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y + 1) == 1){upOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y - 1) == 1){downOpen = false;}
                    if(checkOccupiedTile(this.state.x + 1, this.state.y) == 3){return;}
                    if(checkOccupiedTile(this.state.x - 1, this.state.y) == 3){return;}
                    if(checkOccupiedTile(this.state.x, this.state.y + 1) == 3){return;}
                    if(checkOccupiedTile(this.state.x, this.state.y - 1) == 3){return;}
                    if(checkOccupiedTile(this.state.x + 1, this.state.y) == 4){rightOpen = false;}
                    if(checkOccupiedTile(this.state.x - 1, this.state.y) == 4){leftOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y + 1) == 4){upOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y - 1) == 4){downOpen = false;}
                    if(checkOccupiedTile(this.state.x + 1, this.state.y) == undefined){rightOpen = false;}
                    if(checkOccupiedTile(this.state.x - 1, this.state.y) == undefined){leftOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y + 1) == undefined){upOpen = false;}
                    if(checkOccupiedTile(this.state.x, this.state.y - 1) == undefined){downOpen = false;}
                    
                    if(idealHeading1 == 'right' && rightOpen){this.moveRight();}
                    else if(idealHeading1 == 'left' && leftOpen){this.moveLeft();}
                    else if(idealHeading1 == 'up' && upOpen){this.moveUp();}
                    else if(idealHeading1 == 'down' && downOpen){this.moveDown();}
                    else if(idealHeading2 == 'right' && rightOpen){this.moveRight();}
                    else if(idealHeading2 == 'left' && leftOpen){this.moveLeft();}
                    else if(idealHeading2 == 'up' && upOpen){this.moveUp();}
                    else if(idealHeading2 == 'down' && downOpen){this.moveDown();}
                    else if(idealHeading2 == 'left' && rightOpen){this.moveRight();}
                    else if(idealHeading2 == 'right' && leftOpen){this.moveLeft();}
                    else if(idealHeading2 == 'down' && upOpen){this.moveUp();}
                    else if(idealHeading2 == 'up' && downOpen){this.moveDown();}
                    else if(idealHeading1 == 'left' && rightOpen){this.moveRight();}
                    else if(idealHeading1 == 'right' && leftOpen){this.moveLeft();}
                    else if(idealHeading1 == 'down' && upOpen){this.moveUp();}
                    else if(idealHeading1 == 'up' && downOpen){this.moveDown();}
                }
            }
        ]
    }
]

var room = rooms[currentRoom - 1];

function fixDpi() {
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
};

function scale(){   
    let w = window.innerWidth;
    let h = window.innerHeight;
    if(w/h > gameAspectRatio){
        gameWidth = 0.98*h*gameAspectRatio;
        gameHeight = 0.98*h;
    }
    else{
        gameWidth = 0.98*w;
        gameHeight = 0.98*w/gameAspectRatio;
    }
    game.style.width = `${gameWidth}px`;
    game.style.height = `${gameHeight}px`;
};

function calcX(inputX){
    let x = (1/15) * canvas.width * inputX + 7/15 * canvas.width;
    return x;
};

function calcY(inputY){
    let y = -(1/9) * canvas.height * inputY + 4/9 * canvas.height;
    return y;
};

function renderEntity(x,y,texture){
    let img = new Image();
    img.src = texture;
    ctx.drawImage(
        img,
        0,0,
        96,96,
        calcX(x),calcY(y),
        canvas.width/15,canvas.height/9,
    );
};

function renderBarriers(){
    for(let i = 0; i < 15; i++){
        if(room.barriers.row1[i] == 1){
            renderEntity(i-7,4,'Barrier.png');
        }
        if(room.barriers.row2[i] == 1){
            renderEntity(i-7,3,'Barrier.png');
        }
        if(room.barriers.row3[i] == 1){
            renderEntity(i-7,2,'Barrier.png');
        }
        if(room.barriers.row4[i] == 1){
            renderEntity(i-7,1,'Barrier.png');
        }
        if(room.barriers.row5[i] == 1){
            renderEntity(i-7,0,'Barrier.png');
        }
        if(room.barriers.row6[i] == 1){
            renderEntity(i-7,-1,'Barrier.png');
        }
        if(room.barriers.row7[i] == 1){
            renderEntity(i-7,-2,'Barrier.png');
        }
        if(room.barriers.row8[i] == 1){
            renderEntity(i-7,-3,'Barrier.png');
        }
        if(room.barriers.row9[i] == 1){
            renderEntity(i-7,-4,'Barrier.png');
        }
    }
};

function frameMotion(speed){
    return(speed / 40);
};

/*Tilemap key

0 - Nothing
1 - Barrier
2 - Immovable
3 - Player
4 - Non-Player Entity

Row# = -Y value + 5
Colomn# = X value + 7

*/

function uploadTileMap(uploadX, uploadY, uploadType){
    if(uploadY == 4){
        if(tilesInRow1[uploadX + 7] != 0){
            return;
        }
        tilesInRow1[uploadX + 7] = uploadType;}
    else if(uploadY == 3){
        if(tilesInRow2[uploadX + 7] != 0){
            return;
        }
        tilesInRow2[uploadX + 7] = uploadType;}
    else if(uploadY == 2){
        if(tilesInRow3[uploadX + 7] != 0){
            return;
        }
        tilesInRow3[uploadX + 7] = uploadType;}
    else if(uploadY == 1){
        if(tilesInRow4[uploadX + 7] != 0){
            return;
        }
        tilesInRow4[uploadX + 7] = uploadType;}
    else if(uploadY == 0){
        if(tilesInRow5[uploadX + 7] != 0){
            return;
        }
        tilesInRow5[uploadX + 7] = uploadType;}
    else if(uploadY == -1){
        if(tilesInRow6[uploadX + 7] != 0){
            return;
        }
        tilesInRow6[uploadX + 7] = uploadType;}
    else if(uploadY == -2){
        if(tilesInRow7[uploadX + 7] != 0){
            return;
        }
        tilesInRow7[uploadX + 7] = uploadType;}
    else if(uploadY == -3){
        if(tilesInRow8[uploadX + 7] != 0){
            return;
        }
        tilesInRow8[uploadX + 7] = uploadType;}
    else if(uploadY == -4){
        if(tilesInRow9[uploadX + 7] != 0){
            return;
        }
        tilesInRow9[uploadX + 7] = uploadType;}
};

function checkOccupiedTile(checkX, checkY){
    updateTileMap();
    if(checkY == 4){return tilesInRow1[checkX + 7];}
    else if(checkY == 3){return tilesInRow2[checkX + 7];}
    else if(checkY == 2){return tilesInRow3[checkX + 7];}
    else if(checkY == 1){return tilesInRow4[checkX + 7];}
    else if(checkY == 0){return tilesInRow5[checkX + 7];}
    else if(checkY == -1){return tilesInRow6[checkX + 7];}
    else if(checkY == -2){return tilesInRow7[checkX + 7];}
    else if(checkY == -3){return tilesInRow8[checkX + 7];}
    else if(checkY == -4){return tilesInRow9[checkX + 7];}
};

function resetTileMap(){
    tilesInRow1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow7 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow8 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    tilesInRow9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
};

function barrierLayout(){
    for(let i = 0; i < 15; i++){
        tilesInRow1[i] = room.barriers.row1[i];
        tilesInRow2[i] = room.barriers.row2[i];
        tilesInRow3[i] = room.barriers.row3[i];
        tilesInRow4[i] = room.barriers.row4[i];
        tilesInRow5[i] = room.barriers.row5[i];
        tilesInRow6[i] = room.barriers.row6[i];
        tilesInRow7[i] = room.barriers.row7[i];
        tilesInRow8[i] = room.barriers.row8[i];
        tilesInRow9[i] = room.barriers.row9[i];
    }
};

function updateTileMap(){
    resetTileMap();
    barrierLayout();
    player.uploadPosition();
    for(let i = 0; i < enemyList.length; i++){
        enemyList[i].uploadPosition();
    }
    
};

function enemyActive(){
    for(let i = 0; i < enemyList.length; i++){
        enemyList[i].moveTowardPlayer();
        enemyList[i].motion();
        enemyList[i].activateWalls();
        enemyList[i].render();
    }
};

function eachFrame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateTileMap();
    scale();
    renderBarriers();
    enemyActive();
    player.motion();
    player.activateWalls();
    player.render();

    timeB = performance.now();
    timeDelta = timeB - timeA;
    fps = 1000 / timeDelta;
    timeA = performance.now();

    window.requestAnimationFrame(eachFrame);
};

document.addEventListener('click', function() {
    console.clear();
    console.log(tilesInRow1);
    console.log(tilesInRow2);
    console.log(tilesInRow3);
    console.log(tilesInRow4);
    console.log(tilesInRow5);
    console.log(tilesInRow6);
    console.log(tilesInRow7);
    console.log(tilesInRow8);
    console.log(tilesInRow9);
});

enemyList = room.enemy;

fixDpi();

window.requestAnimationFrame(eachFrame);