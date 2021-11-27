var w,a,s,d = false;
var n0,n1,n2,n3,n4,n5,n6,n7,n8,n9 = false;

document.addEventListener('keydown', function(event) {
    if(event.code == 'KeyW') {w=true;}
    if(event.code == 'KeyA') {a=true;}
    if(event.code == 'KeyS') {s=true;}
    if(event.code == 'KeyD') {d=true;}
    if(event.code == 'Numpad0'){n0=true;}
    if(event.code == 'Numpad1'){n1=true;}
    if(event.code == 'Numpad2'){n2=true;}
    if(event.code == 'Numpad3'){n3=true;}
    if(event.code == 'Numpad4'){n4=true;}
    if(event.code == 'Numpad5'){n5=true;}
    if(event.code == 'Numpad6'){n6=true;}
    if(event.code == 'Numpad7'){n7=true;}
    if(event.code == 'Numpad8'){n8=true;}
    if(event.code == 'Numpad9'){n9=true;}
});
document.addEventListener('keyup', function(event) {
    if(event.code == 'KeyW') {w=false;}
    if(event.code == 'KeyA') {a=false;}
    if(event.code == 'KeyS') {s=false;}
    if(event.code == 'KeyD') {d=false;}
    if(event.code == 'Numpad0'){n0=false;}
    if(event.code == 'Numpad1'){n1=false;}
    if(event.code == 'Numpad2'){n2=false;}
    if(event.code == 'Numpad3'){n3=false;}
    if(event.code == 'Numpad4'){n4=false;}
    if(event.code == 'Numpad5'){n5=false;}
    if(event.code == 'Numpad6'){n6=false;}
    if(event.code == 'Numpad7'){n7=false;}
    if(event.code == 'Numpad8'){n8=false;}
    if(event.code == 'Numpad9'){n9=false;}
});

var player = {
    state: {
        x: -6,
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
        attackCooldown: 0,
        attackCharge: 0,
        lockedAttackKey: 0,
        attackBeginX:0,attackEndX:0,attackCenterX:0,
        attackBeginY:0,attackEndY:0,attackCenterY:0,
        attackAlternateIndex: false,
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
            speed: 5,
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
        renderEntity(this.state.x,this.state.y,'Character_Textures/crimson_tier_9.png');
    },
    moveCooldown: function(delay){
        this.state.moveCooldownIndex = 2 * delay / fps;
    },
    moveRight: function(){
        this.state.heading = 'right';
        this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
    },
    moveLeft: function(){
        this.state.heading = 'left';
        this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
    },
    moveUp: function(){
        this.state.heading = 'up';
        this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
    },
    moveDown: function(){
        this.state.heading = 'down';
        this.state.movementIndex = 1 / frameMotion(this.stats.character.speed);
    },
    motion: function(){
        if(this.state.moveCooldownIndex > 1){
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
            this.state.movementIndex = 0;
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
        if(d && this.state.heading == 'none' && this.state.rightCooldown == 0 && this.state.rightBlocked == 0){
            this.moveRight();
        }
        else if(a && this.state.heading == 'none' && this.state.leftCooldown == 0 && this.state.leftBlocked == 0){
            this.moveLeft();
        }
        else if(w && this.state.heading == 'none' && this.state.upCooldown == 0 && this.state.upBlocked == 0){
            this.moveUp();
        }
        else if(s && this.state.heading == 'none' && this.state.downCooldown == 0 && this.state.downBlocked == 0){
            this.moveDown();
        }
    },
    uploadPosition: function(){
        uploadTileMap(Math.floor(this.state.x),Math.floor(this.state.y),3);
        uploadTileMap(Math.floor(this.state.x),Math.ceil(this.state.y),3);
        uploadTileMap(Math.ceil(this.state.x),Math.floor(this.state.y),3);
        uploadTileMap(Math.ceil(this.state.x),Math.ceil(this.state.y),3);
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
            else if(checkOccupiedTile(Math.ceil(this.state.x),Math.round(this.state.y)) == 4){
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
            else if(checkOccupiedTile(Math.floor(this.state.x),Math.round(this.state.y)) == 4){
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
            else if(checkOccupiedTile(Math.round(this.state.x),Math.ceil(this.state.y)) == 4){
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
            else if(checkOccupiedTile(Math.round(this.state.x),Math.floor(this.state.y)) == 4){
                this.state.x = Math.round(this.state.x);
                this.state.y = Math.round(this.state.y);
            }
        }

        if(checkOccupiedTile(Math.round(this.state.x) + 1,Math.round(this.state.y)) == 4){this.state.rightBlocked = true;}else{{this.state.rightBlocked = 0;}}
        if(checkOccupiedTile(Math.round(this.state.x) - 1,Math.round(this.state.y)) == 4){this.state.leftBlocked = true;}else{{this.state.leftBlocked = 0;}}
        if(checkOccupiedTile(Math.round(this.state.x),Math.round(this.state.y) + 1) == 4){this.state.upBlocked = true;}else{{this.state.upBlocked = 0;}}
        if(checkOccupiedTile(Math.round(this.state.x),Math.round(this.state.y) - 1) == 4){this.state.downBlocked = true;}else{{this.state.downBlocked = 0;}}
    },
    attackKey: function(){
        if(this.state.attackCooldown > 0 || this.state.lockedAttackKey != 0){
            this.state.attackCooldown -= 1;
            return;
        }
        this.state.attackCooldown = 0;
        if(n1){this.state.lockedAttackKey = 1;}
        else if(n2){this.state.lockedAttackKey = 2;}
        else if(n3){this.state.lockedAttackKey = 3;}
        else if(n4){this.state.lockedAttackKey = 4;}
        //else if(n5){this.state.lockedAttackKey = 5;}
        else if(n6){this.state.lockedAttackKey = 6;}
        else if(n7){this.state.lockedAttackKey = 7;}
        else if(n8){this.state.lockedAttackKey = 8;}
        else if(n9){this.state.lockedAttackKey = 9;}
        else{return;}
    },
    chargeAttack: function(){
        const interval = 0.1; 
        if(this.state.lockedAttackKey == 0 || this.state.attackCharge >= 1){
            this.state.attackCharge = Math.floor(this.state.attackCharge);
            return;
        }
        else if(n1 && this.state.lockedAttackKey == 1){
            this.state.attackCharge += interval;
        }
        else if(n2 && this.state.lockedAttackKey == 2){
            this.state.attackCharge += interval;
        }
        else if(n3 && this.state.lockedAttackKey == 3){
            this.state.attackCharge += interval;
        }
        else if(n4 && this.state.lockedAttackKey == 4){
            this.state.attackCharge += interval;
        }
        else if(n5 && this.state.lockedAttackKey == 5){
            this.state.attackCharge += interval;
        }
        else if(n6 && this.state.lockedAttackKey == 6){
            this.state.attackCharge += interval;
        }
        else if(n7 && this.state.lockedAttackKey == 7){
            this.state.attackCharge += interval;
        }
        else if(n8 && this.state.lockedAttackKey == 8){
            this.state.attackCharge += interval;
        }
        else if(n9 && this.state.lockedAttackKey == 9){
            this.state.attackCharge += interval;
        }
    },
    attackIcon: function(){
        if(this.state.lockedAttackKey == 0 || this.state.lockedAttackKey == 5){return;}
        let snapRatio = 2;
        this.state.attackCenterX = (snapRatio * Math.round(this.state.x) + this.state.x) / (snapRatio + 1);
        this.state.attackCenterY = (snapRatio * Math.round(this.state.y) + this.state.y) / (snapRatio + 1);
        let direction;
        let relativeX = 0;
        let relativeY = 0;
        let imgWidth = stage.width / 15;
        let imgHeight = stage.height / 9;
        if(this.state.lockedAttackKey == 2){
            direction = 90;
            relativeY = -1;
        }
        else if(this.state.lockedAttackKey == 4){
            direction = 180;
            relativeX = -1;
        }
        else if(this.state.lockedAttackKey == 6){
            direction = 0;
            relativeX = 1;
        }
        else if(this.state.lockedAttackKey == 8){
            direction = 270;
            relativeY = 1;
        }
        else if(this.state.lockedAttackKey == 1){
            if(this.state.attackAlternateIndex){
                direction = 90;
                relativeX = -1;
            }
            else{
                direction = 180;
                relativeY = -1;
            }
        }
        else if(this.state.lockedAttackKey == 3){
            if(this.state.attackAlternateIndex){
                direction = 0;
                relativeY = -1;
            }
            else{
                direction = 90;
                relativeX = 1;
            }
        }
        else if(this.state.lockedAttackKey == 7){
            if(this.state.attackAlternateIndex){
                direction = 180;
                relativeY = 1;
            }
            else{
                direction = 270;
                relativeX = -1;
            }
        }
        else if(this.state.lockedAttackKey == 9){
            if(this.state.attackAlternateIndex){
                direction = 270;
                relativeX = 1;
            }
            else{
                direction = 0;
                relativeY = 1;
            }
        }

        let targetX = calcX(this.state.attackCenterX + relativeX + 0.5);
        let targetY = calcY(this.state.attackCenterY + relativeY - 0.5);
        let targetDist = Math.sqrt(targetX ** 2 + targetY ** 2);
        let theta = Math.atan(targetY / targetX) * 180 / Math.PI;
        let targetRelativeX = targetDist * Math.cos((theta - direction) * Math.PI / 180);
        let targetRelativeY = targetDist * Math.sin((theta - direction) * Math.PI / 180);

        if(checkOccupiedTile(Math.round(this.state.attackCenterX) + relativeX,Math.round(this.state.attackCenterY) + relativeY) == 1 
        || checkOccupiedTile(Math.round(this.state.attackCenterX)+ relativeX,Math.round(this.state.attackCenterY) + relativeY) == undefined){
            this.state.attackCharge = 0;
            if(this.state.attackAlternateIndex){
                this.state.attackAlternateIndex = false;
            }
            else{
                this.state.attackAlternateIndex = true;
            }
            return;
        }
        
        let img = new Image();
        img.src = 'Attack_Icons/crimson_attack_direction.png';
        ctx.save();
        ctx.rotate(direction * Math.PI / 180);
        ctx.translate(targetRelativeX,targetRelativeY);
        ctx.drawImage(
            img,
            0,0,
            96,96,
            -imgWidth/2,-imgHeight/2,
            imgWidth,imgHeight,
        );
        ctx.restore();
        let reach = 2;
        renderParticle(this.state.attackCenterX + relativeX,this.state.attackCenterY + relativeY,this.state.attackCharge * 4/12,0,`rgb(${120 + 120 * this.state.attackCharge},30,30)`);
        this.attack(this.state.attackCenterX + relativeX,this.state.attackCenterY + relativeY,direction,reach,this.state.attackCharge,2 + 2 * reach,`rgb(${120 + 120 * this.state.attackCharge},30,30)`);
        //renderParticle(this.state.attackCenterX + relativeX,this.state.attackCenterY + relativeY,1,0,'red');
    },
    resetAttack: function(){
        this.state.attackCooldown = 10;
        this.state.attackCharge = 0.1;
        this.state.lockedAttackKey = 0;
        if(this.state.attackAlternateIndex){
            this.state.attackAlternateIndex = false;
        }
        else{
            this.state.attackAlternateIndex = true;
        }
    },
    attack: function(x,y,direction,length,charge,duration,color){
        let newStrike = {x:x,y:y,xVect:0,yVect:0,charge:charge,now:0,duration:duration,color:color,from:'player'};

        if(direction == 0){newStrike.xVect = length}
        else if(direction == 90){newStrike.yVect = -length}
        else if(direction == 180){newStrike.xVect = -length}
        else if(direction == 270){newStrike.yVect = length}

        if(this.state.lockedAttackKey == 0){
            return;
        }
        else if(!n1 && this.state.lockedAttackKey == 1){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n2 && this.state.lockedAttackKey == 2){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n3 && this.state.lockedAttackKey == 3){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n4 && this.state.lockedAttackKey == 4){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n5 && this.state.lockedAttackKey == 5){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n6 && this.state.lockedAttackKey == 6){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n7 && this.state.lockedAttackKey == 7){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n8 && this.state.lockedAttackKey == 8){
            this.resetAttack();
            strikeList.push(newStrike);
        }
        else if(!n9 && this.state.lockedAttackKey == 9){
            this.resetAttack();
            strikeList.push(newStrike);
        }
    }
};