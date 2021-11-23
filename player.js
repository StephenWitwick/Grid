var w,a,s,d = 0;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {w=1;}
    if(event.keyCode == 65) {a=1;}
    if(event.keyCode == 83) {s=1;}
    if(event.keyCode == 68) {d=1;}
});
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 87) {w=0;}
    if(event.keyCode == 65) {a=0;}
    if(event.keyCode == 83) {s=0;}
    if(event.keyCode == 68) {d=0;}
});

var player = {
    state: {
        x: 0,
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
            speed: 6,
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
        renderEntity(this.state.x,this.state.y,'Character_Textures/crimson_tier_1.png');
    },
    moveCooldown: function(delay){
        this.state.moveCooldownIndex = delay / fps;
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
        if(d == 1 && this.state.heading == 'none' && this.state.rightCooldown == 0 && this.state.rightBlocked == 0){
            this.moveRight();
        }
        else if(a == 1 && this.state.heading == 'none' && this.state.leftCooldown == 0 && this.state.leftBlocked == 0){
            this.moveLeft();
        }
        else if(w == 1 && this.state.heading == 'none' && this.state.upCooldown == 0 && this.state.upBlocked == 0){
            this.moveUp();
        }
        else if(s == 1 && this.state.heading == 'none' && this.state.downCooldown == 0 && this.state.downBlocked == 0){
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
    }
};