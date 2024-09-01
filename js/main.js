/* Draw the tiles on the div */
const tilesDiv = document.querySelector("#tiles-div");
const scoreDiv = document.querySelector("#score_1");
const bestScoreDiv = document.querySelector("#best-score");
const startBtn = document.querySelector("#start-button");

// Initial values
let tilesArray;
let score = 0;
let bestScore = 0;
let tiles = null;

function initializeTiles(){
    // Initialize the tiles array with zeros
    return [
        [0, 0, 0, 0], 
        [0, 0, 0, 0],  
        [0, 0, 0, 0],  
        [0, 0, 0, 0], 
    ]
}


function loadArray(){
    const savedTiles = localStorage.getItem('tilesArray');
    if(savedTiles){
        tilesArray = JSON.parse(savedTiles);
    }else{
        tilesArray = initializeTiles(); 
    }
}

function loadScore(){
    const savedScore = localStorage.getItem('score');
    if(savedScore){
        score = JSON.parse(savedScore);
    }else{
        score = 0;
    }
}

function loadBestScore(){
    const savedBestScore = localStorage.getItem('bestScore');
    if(savedBestScore){
        bestScoreDiv.innerHTML = `Best ${JSON.parse(savedBestScore)}`;
    }else{
        bestScoreDiv.innerHTML = `Best 0`;
    }
}

// Load the saved game state if available
loadArray();
loadScore();
loadBestScore();




// Function to generate two new tiles with random values
function generateTwoTiles(tiles) {
    // Call
    for (let i = 0; i < 2; i++) {
        tiles.generateInitialTiles();
    }   
}

function onHandleRestart() {
    // Restart everything
    tiles = null;
    tilesArray = initializeTiles();
    score = 0;
    scoreDiv.innerHTML = `Score ${score}`;
    localStorage.setItem('tilesArray', JSON.stringify(tilesArray));
    tiles = new Tiles(tilesArray);
    generateTwoTiles(tiles);
    tiles.generateTiles();
}

startBtn.addEventListener("click", onHandleRestart)

function main() {
    // Your main game loop goes here
    try{
        tiles = new Tiles(tilesArray);
        tiles.generateTiles();
        generateTwoTiles(tiles);
        scoreDiv.innerHTML = `Score ${score}`;
    }catch(e){
        console.error(e.message);
    }
}

main();



