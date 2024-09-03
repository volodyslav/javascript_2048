class Tiles {
    constructor(tilesArray) {
        this.tilesArray = tilesArray;
        this.gameIsPlaying = true;

        this.#handleKeyboards();
        
        
    }

    #handleKeyboards(){
        document.addEventListener("keydown", (event) => {
            event.preventDefault();
            // Remove previous tile
            const tiles = document.querySelectorAll(".tile-div");
            tiles.forEach(tile => tile.parentNode.removeChild(tile));
            
            if (event.key === "ArrowUp" || event.key === "w") {
                this.#moveTilesUp();
            } else if (event.key === "ArrowDown" || event.key === "s") {
                this.#moveTilesDown();
            } else if (event.key === "ArrowLeft" || event.key === "a") {
                this.#moveTilesLeft();
            } else if (event.key === "ArrowRight" || event.key === "d") {
                this.#moveTilesRight();
            }
            
            this.generateTiles();
            this.generateInitialTiles(); // Generate initial tiles 2
            
            this.#saveGameState(); // Save the game state to local storage
            this.#checkWinning(); // Check the game state
        }); 
    }

    #saveGameState(){
        // Save the game state to local storage
        localStorage.setItem('tilesArray', JSON.stringify(tilesArray));
        localStorage.setItem('score', JSON.stringify(score));
        // Save the game state to local storage
        if (score > bestScore){
            bestScore = score;
        }
        localStorage.setItem('bestScore', JSON.stringify(bestScore));
        bestScoreDiv.innerHTML = `Best ${bestScore}`
    }

    drawTiles(row, col, combine=false) {
        // Clear the tile before drawing a new one
        const newTile = document.createElement("div");
        newTile.classList.add("tile-div");
        newTile.style.backgroundColor = colorValue[this.tilesArray[row][col]];
        
        // draw text
        if (this.tilesArray[row][col] !== 0){
            newTile.innerHTML = `${this.tilesArray[row][col]}`
            if(combine){
                newTile.classList.add("tile-combine");
            }
        }
        newTile.style.color = colors[this.tilesArray[row][col]]
        newTile.style.top = `${row * sizeTile}px`;
        newTile.style.left = `${col * sizeTile}px`;
        tilesDiv.appendChild(newTile);
    }

    generateInitialTiles(){
        // Generate random numbers for the tiles
        const zeroValue = [];
        for (let row = 0; row < tilesColumn; row++){
            for (let col = 0; col < tilesColumn; col++){
                if (this.tilesArray[row][col] === 0){
                    zeroValue.push([row, col]);
                }
            }
        }
        
        const zeroValueLength = zeroValue.length;
        if (zeroValueLength !== 0 && this.gameIsPlaying){
            const randomArray = zeroValue[Math.floor(Math.random() * zeroValueLength)]
            // Fill the tile with the random value
            this.tilesArray[randomArray[0]][randomArray[1]] = 2;
            this.drawTiles(randomArray[0], randomArray[1]);
        }
        if (this.gameIsPlaying && zeroValueLength < 4) {
            this.#checkPlayingGame();
        }
    }

    #checkWinning(){
        if (this.gameIsPlaying){
            for (let row = 0; row < tilesColumn; row++){
                for (let col = 0; col < tilesColumn; col++){
                    // Check if the tile value is 2048
                    if (this.tilesArray[row][col] === 2048) {
                        this.gameIsPlaying = false;
                        restart.style.display = 'flex';
                        textGame.innerHTML = "You Win!"
                        return 
                    }
                }
            }
        }
        
    }

    #checkPlayingGame(){
        let gameOverArray = [];
        for (let row = 0; row < tilesColumn; row++){
            for (let col = 0; col < tilesColumn; col++){
                // Check if all tiles are filled or not
                if (this.tilesArray[row][col] === 0) {
                    gameOverArray.push(true);
                }
                // Check adjacent tiles for possible moves
                if (col < tilesColumn - 1 && this.tilesArray[row][col] === this.tilesArray[row][col + 1]) {
                    gameOverArray.push(true);
                }
                if (row < tilesColumn - 1 && this.tilesArray[row][col] === this.tilesArray[row + 1][col]) {
                    gameOverArray.push(true);
                }
            }
        }
        console.log(gameOverArray)
        if (gameOverArray.length === 0){
            this.gameIsPlaying = false;
            restart.style.display = 'flex';
            textGame.innerHTML = "You lose!"
        }else{
            this.gameIsPlaying = true;
            restart.style.display = 'none';
        }
    }
        
    

    generateTiles(){
        // Draw the image tiles
        for (let h = 0; h < tilesColumn; h++){
            for (let w = 0; w < tilesColumn; w++){
                this.drawTiles(h, w);
            }
        }
    }

    #moveTilesRight(){
        for (let row = 3; row >= 0; row--){
            for (let col = 3; col >= 0; col--){
                let prevColumn = col // Get the column
                // Start to iter from 3 to 0 and then combine or move the tile
                while (prevColumn !== 0 ){
                    prevColumn--;
                    this.#checkColumnZero(prevColumn, row, col);
                    if(this.tilesArray[row][col] !== this.tilesArray[row][prevColumn] && this.tilesArray[row][prevColumn] !== 0){
                        break;
                    }
                    this.#checkColumnMove(prevColumn, row, col);    
                }
            }
        }
    }

    #moveTilesLeft(){
        for (let row = 0; row < tilesColumn; row++){
            for (let col = 0; col < tilesColumn; col++){
                let prevColumn = col // Get the previuos column
                // Start to iter from 0 to 3 and then combine or move the tile
                while (prevColumn !== 3 && (this.tilesArray[row][prevColumn + 1] === 0 || this.tilesArray[row][prevColumn + 1] !== 0)){
                    prevColumn++;
                    this.#checkColumnZero(prevColumn, row, col);
                    // Break if 4 !== 8
                    if(this.tilesArray[row][col] !== this.tilesArray[row][prevColumn] && this.tilesArray[row][prevColumn] !== 0){
                        break;
                    }
                    this.#checkColumnMove(prevColumn, row, col);
                }
            }
        }
    }

    #checkColumnZero(prevColumn, row, col){
        if (this.tilesArray[row][col] === 0 && this.tilesArray[row][prevColumn] !== 0){
            this.tilesArray[row][col] = this.tilesArray[row][prevColumn];
            this.tilesArray[row][prevColumn] = 0;
            this.drawTiles(row, col);
        }
    }

    #checkColumnMove(prevColumn, row, col){
        if(this.tilesArray[row][col] === this.tilesArray[row][prevColumn]){
            scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
            this.tilesArray[row][col] *= 2;
            this.tilesArray[row][prevColumn] = 0;
            this.drawTiles(row, col, true);
        }
    }

    #moveTilesDown(){
        for (let row = 3; row >= 0; row--){
            for (let col = 3; col >= 0; col--){
                let prevRow = row  // Get the row
                // Start to iter from 3 to 0 and then combine or move the tile
                while (prevRow !== 0 && (this.tilesArray[prevRow - 1][col] === 0 || this.tilesArray[prevRow - 1][col] !== 0)){
                    prevRow--;
                    this.#checkRowZero(prevRow, row, col);
                    if(this.tilesArray[row][col] !== this.tilesArray[prevRow][col] && this.tilesArray[prevRow][col] !== 0){
                        break;
                    }
                    this.#checkRowMove(prevRow, row, col);
                }
            }
        }
    }

    #moveTilesUp(){
        for (let row = 0; row < tilesColumn; row++){
            for (let col = 0; col < tilesColumn; col++){
                let prevRow = row  // Get the row
                // Start to iter from 3 to 0 and then combine or move the tile
                while (prevRow !== 3 && (this.tilesArray[prevRow + 1][col] === 0 || this.tilesArray[prevRow + 1][col] !== 0)){
                    prevRow++;
                    this.#checkRowZero(prevRow, row, col);
                    if(this.tilesArray[row][col] !== this.tilesArray[prevRow][col] && this.tilesArray[prevRow][col] !== 0){
                        break;
                    }
                    this.#checkRowMove(prevRow, row, col);
                }
            }
        }
    }

    #checkRowZero(prevRow, row, col){
        if (this.tilesArray[row][col] === 0 && this.tilesArray[prevRow][col] !== 0){
            this.tilesArray[row][col] = this.tilesArray[prevRow][col];
            this.tilesArray[prevRow][col] = 0;
            this.drawTiles(row, col);
        }
    }

    #checkRowMove(prevRow, row, col){
        if(this.tilesArray[row][col] === this.tilesArray[prevRow][col]){
            scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
            this.tilesArray[row][col] *= 2;
            this.tilesArray[prevRow][col] = 0;
            this.drawTiles(row, col, true);
        }
    }
}