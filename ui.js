var hud = loophole1.namedItem('hud');
var ui = hud.getContext('2d');
ui.imageSmoothingEnabled = true;

//Status: hp, mana, attack cooldown

function resetUi(){
    ui.clearRect(0,0,hud.width,hud.height);
};

function drawStatusBars(hp, mana, margin){
    if(hp >= 60){ui.fillStyle = 'rgb(30,240,30)';}
    else if(hp >= 30){ui.fillStyle = 'rgb(150,240,30)';}
    else if(hp >= 10){ui.fillStyle = 'rgb(240,150,30)';}
    else{ui.fillStyle = 'rgb(240,30,30)';}

    ui.fillRect((14 + margin) * hud.width/180, (14 + margin) * hud.height/24, (163 - 2 * margin) * hud.width/180 * hp/100, (7 - 2 * margin) * hud.height/24);

    if(mana >= 60){ui.fillStyle = 'rgb(0,240,240)';}
    else if(mana >= 30){ui.fillStyle = 'rgb(0,210,210)';}
    else if(mana >= 10){ui.fillStyle = 'rgb(0,180,180)';}
    else{ui.fillStyle = 'rgb(0,150,150)';}

    ui.fillRect((14 + margin) * hud.width/180, (3 + margin) * hud.height/24, (73 - 2 * margin) * hud.width/180 * mana/100, (7 - 2 * margin) * hud.height/24);
};
