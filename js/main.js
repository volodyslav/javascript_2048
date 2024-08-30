
/* Draw the tiles on the div */
const tilesDiv = document.querySelector("#tiles-div");
const tilesColumn = 4;

function drawTiles(){
    for (let h = 1; h <= tilesColumn; h++){
        for (let w = 1; w <= tilesColumn; w++){
            const newTile = document.createElement("div");
            newTile.classList.add("tile-div");
            tilesDiv.appendChild(newTile);
        }
    }
}

drawTiles();