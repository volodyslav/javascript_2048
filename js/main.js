
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
}

// Text colors
const color = {
    2: "rgb(150, 148, 148)",
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

generateTiles();
for (let i = 0; i < 6; i++) {
    generateInitialTiles();
}
