
/* Draw the tiles on the div */
const tilesDiv = document.querySelector("#tiles-div");
// Collumn and rows
const tilesColumn = 4;
// Size with space
const sizeTile = 115;

// Initialize the tiles array with zeros
let tilesArray = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0],  
    [0, 0, 0, 0],  
    [0, 0, 0, 0], 
]

// BG colors
const colorValue = {
    0: "rgb(150, 148, 148)",
    2: "rgb(218, 211, 211)",
    4: "rgb(201, 192, 169)",
    8: "rgb(194, 143, 23)",
    16: "rgb(217, 84, 17)",
    32: "rgb(181, 61, 0)",
    64: "rgb(148, 51, 1)",
    128: "rgb(224, 221, 22)",
}

// Text colors
const color = {
    2: "black",
    4: "black",
    8: "white",
    16: "white",
    32: "white",
    64: "white",
    128: "white",
}

function drawTiles(row, col){
    // Clear the tile before drawing a new one

    const newTile = document.createElement("div");
    newTile.classList.add("tile-div");
    newTile.style.backgroundColor = colorValue[tilesArray[row][col]];
    if (tilesArray[row][col] !== 0){
        newTile.innerHTML = `${tilesArray[row][col]}`
    }
    newTile.style.color = color[tilesArray[row][col]]
    newTile.style.top = `${row * sizeTile}px`;
    newTile.style.left = `${col * sizeTile}px`;
    tilesDiv.appendChild(newTile);
}

function generateInitialTiles(){
    // Generate random numbers for the tiles
    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);
  
    const arrayValue = tilesArray[row][column] === 0 ? tilesArray[row][column] = 2 : generateInitialTiles();

    console.log(`Row and column: ${row}, ${column}, ${arrayValue}`)

    // Fill the tile with the random value
    if (arrayValue === 2){
        drawTiles(row, column);
    }
}


function generateTiles(){
    // Draw the image tiles
    for (let h = 0; h < tilesColumn; h++){
        for (let w = 0; w < tilesColumn; w++){
            drawTiles(h, w);
        }
    }
}


function moveTilesRight(){
    for (let row = 3; row >= 0; row--){
        for (let col = 3; col >= 0; col--){
            let prevColumn = col // Get the column
            // Start to iter from 3 to 0 and then combine or move the tile
            while (prevColumn !== 0 && (tilesArray[row][prevColumn - 1] === 0 || tilesArray[row][prevColumn - 1] !== 0)){
                prevColumn--;
                if(tilesArray[row][col] === tilesArray[row][prevColumn]){
                    tilesArray[row][col] *= 2;
                    tilesArray[row][prevColumn] = 0;
                    drawTiles(row, col);
                }
                if (tilesArray[row][col] === 0 && tilesArray[row][prevColumn] !== 0){
                    tilesArray[row][col] = tilesArray[row][prevColumn];
                    tilesArray[row][prevColumn] = 0;
                    drawTiles(row, col);
                }
            }
        }
    }
}

function moveTilesLeft(){
    for (let row = 0; row < tilesColumn; row++){
        for (let col = 0; col < tilesColumn; col++){
            let prevColumn = col // Get the previuos column
            // Start to iter from 0 to 3 and then combine or move the tile
            while (prevColumn !== 3 && (tilesArray[row][prevColumn + 1] === 0 || tilesArray[row][prevColumn + 1] !== 0)){
                prevColumn++;
                if(tilesArray[row][col] === tilesArray[row][prevColumn]){
                    tilesArray[row][col] *= 2;
                    tilesArray[row][prevColumn] = 0;
                    drawTiles(row, col);
                }
                if (tilesArray[row][col] === 0 && tilesArray[row][prevColumn] !== 0){
                    tilesArray[row][col] = tilesArray[row][prevColumn];
                    tilesArray[row][prevColumn] = 0;
                    drawTiles(row, col);
                }
            }
        }
    }
}

function moveTilesDown(){
    for (let row = 3; row >= 0; row--){
        for (let col = 3; col >= 0; col--){
            let prevRow = row  // Get the row
            // Start to iter from 3 to 0 and then combine or move the tile
            while (prevRow !== 0 && (tilesArray[prevRow - 1][col] === 0 || tilesArray[prevRow - 1][col] !== 0)){
                prevRow--;
                if(tilesArray[row][col] === tilesArray[prevRow][col]){
                    tilesArray[row][col] *= 2;
                    tilesArray[prevRow][col] = 0;
                    drawTiles(row, col);
                }
                if (tilesArray[row][col] === 0 && tilesArray[prevRow][col] !== 0){
                    tilesArray[row][col] = tilesArray[prevRow][col];
                    tilesArray[prevRow][col] = 0;
                    drawTiles(row, col);
                }
            }
        }
    }
}

function moveTilesUp(){
    for (let row = 0; row < tilesColumn; row++){
        for (let col = 0; col < tilesColumn; col++){
            let prevRow = row  // Get the row
            // Start to iter from 3 to 0 and then combine or move the tile
            while (prevRow !== 3 && (tilesArray[prevRow + 1][col] === 0 || tilesArray[prevRow + 1][col] !== 0)){
                prevRow++;
                if(tilesArray[row][col] === tilesArray[prevRow][col]){
                    tilesArray[row][col] *= 2;
                    tilesArray[prevRow][col] = 0;
                    drawTiles(row, col);
                }
                if (tilesArray[row][col] === 0 && tilesArray[prevRow][col] !== 0){
                    tilesArray[row][col] = tilesArray[prevRow][col];
                    tilesArray[prevRow][col] = 0;
                    drawTiles(row, col);
                }
            }
        }
    }
}

function handleKeyboards(){
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        // Remove previous tile
        const tiles = document.querySelectorAll(".tile-div");
        tiles.forEach(tile => tile.parentNode.removeChild(tile));
        
        if (event.key === "ArrowUp" || event.key === "w") {
            moveTilesUp();
        } else if (event.key === "ArrowDown" || event.key === "s") {
            moveTilesDown();
        } else if (event.key === "ArrowLeft" || event.key === "a") {
            moveTilesLeft();
        } else if (event.key === "ArrowRight" || event.key === "d") {
            moveTilesRight();
        }
        generateInitialTiles(); // Generate initial tiles 2
        generateTiles();
        
    }); 
}

// Call
generateTiles();
for (let i = 0; i < 8; i++) {
    generateInitialTiles();
}
handleKeyboards();
