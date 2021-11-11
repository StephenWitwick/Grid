var tilesInRow1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow7 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow8 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tilesInRow9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var enemyMap = [];

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
    if(uploadY == 4){tilesInRow1[uploadX + 7] = uploadType;}
    else if(uploadY == 3){tilesInRow2[uploadX + 7] = uploadType;}
    else if(uploadY == 2){tilesInRow3[uploadX + 7] = uploadType;}
    else if(uploadY == 1){tilesInRow4[uploadX + 7] = uploadType;}
    else if(uploadY == 0){tilesInRow5[uploadX + 7] = uploadType;}
    else if(uploadY == -1){tilesInRow6[uploadX + 7] = uploadType;}
    else if(uploadY == -2){tilesInRow7[uploadX + 7] = uploadType;}
    else if(uploadY == -3){tilesInRow8[uploadX + 7] = uploadType;}
    else if(uploadY == -4){tilesInRow9[uploadX + 7] = uploadType;}
};

function checkOccupiedTile(checkX, checkY){
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

function updateTileMap(){
    resetTileMap();
    loadPlayerPosition();
};

document.addEventListener('click', function(event) {
    updateTileMap();
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