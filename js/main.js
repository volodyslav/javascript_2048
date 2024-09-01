/* Draw the tiles on the div */
const tilesDiv = document.querySelector("#tiles-div");
const scoreDiv = document.querySelector("#score_1");
const startBtn = document.querySelector("#start-button");
// Initialize the tiles array with zeros

function initializeTiles(){
    return [
        [0, 0, 0, 0], 
        [0, 0, 0, 0],  
        [0, 0, 0, 0],  
        [0, 0, 0, 0], 
    ]
}

let tilesArray;
function loadArray(){
    const savedTiles = localStorage.getItem('tilesArray');
    if(savedTiles){
        tilesArray = JSON.parse(savedTiles);
    }else{
        tilesArray = initializeTiles(); 
    }
}

loadArray();


let score = 0;

function onHandleRestart() {
    tilesArray = initializeTiles();
    score = 0;
    scoreDiv.innerHTML = `Score ${score}`;
    localStorage.setItem('tilesArray', JSON.stringify(tilesArray));
}

startBtn.addEventListener("click", onHandleRestart)


try{
    const tiles = new Tiles(tilesArray);
    tiles.generateTiles();
    // Call
    for (let i = 0; i < 2; i++) {
        tiles.generateInitialTiles();
    }
    scoreDiv.innerHTML = `Score ${score}`;
}catch(e){
    console.error(e.message);
}


