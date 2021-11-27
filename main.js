var fps = 30;
var game = document.getElementById('game');
var gameAspectRatio = 4/3;
var gameWidth, gameHeight;
var loophole1 = document.getElementsByTagName('canvas')
var stage = loophole1.namedItem('stage');
var ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;
var timeA,timeB,timeDelta;
var dpi = devicePixelRatio;
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
var strikeList = [];

const rooms = [
    {
        barriers: {
            row1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            row2: [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
            row3: [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
            row4: [0,0,0,0,0,1,1,1,1,0,0,1,1,1,0],
            row5: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
            row6: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            row7: [0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
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
                    damageCooldown: 0
                },
                stats: {
                    character: {
                        hpRegen: 1,
                        manaRegen: 1,
                        strength: 1,
                        dexterity: 1,
                        constitution: 1,
                        speed: 2,
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
                    this.state.moveCooldownIndex = 2 * delay / fps;
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
                    if(this.state.movementIndex < 1){
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
                },
                damage: function(){
                    if(this.state.damageCooldown > 0){
                        this.state.damageCooldown -= 1;
                        return;
                    }
                    this.state.damageCooldown = 0;
                    for(let i = 0; i < strikeList.length; i++){
                        let potentialDamage = strikeList[i].charge * player.stats.character.strength * 10;
                        if(strikeList[i].from == 'player'){
                            if(strikeList[i].x <= this.state.x 
                            && strikeList[i].x + strikeList[i].xVect * strikeList[i].now >= this.state.x
                            && Math.abs(strikeList[i].y - this.state.y) <= 0.5)
                            {
                                this.state.hp -= potentialDamage;
                                this.state.damageCooldown = strikeList[i].duration - strikeList[i].now;
                            }
                            else if(strikeList[i].x >= this.state.x 
                                && strikeList[i].x + strikeList[i].xVect * strikeList[i].now <= this.state.x
                                && Math.abs(strikeList[i].y - this.state.y) <= 0.5)
                            {
                                    this.state.hp -= potentialDamage;
                                    this.state.damageCooldown = strikeList[i].duration - strikeList[i].now;
                            }
                            else if(strikeList[i].y <= this.state.y 
                                && strikeList[i].y + strikeList[i].yVect * strikeList[i].now >= this.state.y
                                && Math.abs(strikeList[i].x - this.state.x) <= 0.5)
                            {
                                    this.state.hp -= potentialDamage;
                                    this.state.damageCooldown = strikeList[i].duration - strikeList[i].now;
                            }
                            else if(strikeList[i].y >= this.state.y 
                                && strikeList[i].y + strikeList[i].yVect * strikeList[i].now <= this.state.y
                                && Math.abs(strikeList[i].x - this.state.x) <= 0.5)
                            {
                                    this.state.hp -= potentialDamage;
                                    this.state.damageCooldown = strikeList[i].duration - strikeList[i].now;
                            }
                        }
                    }
                }
            }
        ]
    }
]

var room = rooms[currentRoom - 1];

function fixDpi() {
    let style_height = +getComputedStyle(stage).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(stage).getPropertyValue("width").slice(0, -2);
    stage.setAttribute('height', style_height * dpi);
    stage.setAttribute('width', style_width * dpi);
    let hud_style_height = +getComputedStyle(hud).getPropertyValue("height").slice(0, -2);
    let hud_style_width = +getComputedStyle(hud).getPropertyValue("width").slice(0, -2);
    hud.setAttribute('height', hud_style_height * dpi);
    hud.setAttribute('width', hud_style_width * dpi);
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
    stage.width = 0.98 * gameWidth;
    stage.height = 0.784 * gameHeight;
};

function calcX(inputX){
    let x = (1/15) * stage.width * inputX + 7/15 * stage.width;
    return x;
};

function calcY(inputY){
    let y = -(1/9) * stage.height * inputY + 4/9 * stage.height;
    return y;
};

function strike(x,y,xVect, yVect, charge, now, duration, color){
    //(maxStrikeParticleSize)
    let maxPS = 4/12;
    let xInterval = xVect / duration;
    let yInterval = yVect / duration;
    let sizeInterval = (2/3) * maxPS * (charge  - 1/12) / duration;
    for(let i = 0; i < now + 1; i++){
        let particleX = x + i * xInterval;
        let particleY = y + i * yInterval;
        let particleSize = charge * maxPS - i * sizeInterval;
        if(particleSize < 1/12){particleSize = 1/12}
        if(checkOccupiedTile(Math.round(particleX),Math.round(particleY)) == 1){break;}
        renderParticle(particleX,particleY,particleSize,0,color);
    }
};

function renderStrikes(){
    for(let i = 0; i < strikeList.length; i++){
        strike(strikeList[i].x,strikeList[i].y,strikeList[i].xVect,strikeList[i].yVect,strikeList[i].charge,strikeList[i].now,strikeList[i].duration,strikeList[i].color);
        if(strikeList[i].now < strikeList[i].duration){
            strikeList[i].now++;
        }
        else{strikeList.splice(i,1);}
    }
};

function renderParticle(x,y,size,angle,color){
    let w = size * stage.width / 15;
    let h = size * stage.height / 9;
    let targetDist = Math.sqrt(calcX(x + 0.5) ** 2 + calcY(y - 0.5) ** 2);
    let targetAngle = Math.atan(calcY(y - 0.5) / calcX(x + 0.5)) * 180 / Math.PI;
    let targetRelativeAngle = targetAngle - angle;
	let targetRelativeX = targetDist * Math.cos(targetRelativeAngle * Math.PI / 180);
	let targetRelativeY = targetDist * Math.sin(targetRelativeAngle * Math.PI / 180);
    ctx.fillStyle = color;
    ctx.save();
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(targetRelativeX,targetRelativeY);
    ctx.fillRect(-w/2,-h/2,w,h);
    ctx.restore();
};

function renderEntity(x,y,texture){
    let img = new Image();
    img.src = texture;
    ctx.drawImage(
        img,
        0,0,
        96,96,
        calcX(x),calcY(y),
        stage.width/15,stage.height/9,
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
    return(speed / 60);
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
        if(enemyList[i].state.hp <= 0){continue;}
        enemyList[i].uploadPosition();
    }
    
};

function enemyActive(){
    for(let i = 0; i < enemyList.length; i++){
        if(enemyList[i].state.hp <= 0){continue;}
        enemyList[i].damage();
        enemyList[i].moveTowardPlayer();
        enemyList[i].motion();
        enemyList[i].activateWalls();
        enemyList[i].render();
    }
};

function eachFrame(){
    ctx.clearRect(0,0,stage.width,stage.height);
    resetUi();
    drawStatusBars(player.state.hp,player.state.mana,0.5);
    updateTileMap();
    scale();
    renderBarriers();
    enemyActive();
    player.motion();
    player.activateWalls();
    player.render();
    player.attackKey();
    player.chargeAttack();
    player.attackIcon();
    renderStrikes();

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