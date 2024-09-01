class Tiles {
    constructor(tilesArray) {
        this.tilesArray = tilesArray;
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
            this.generateInitialTiles(); // Generate initial tiles 2
            this.generateTiles();
            localStorage.setItem('tilesArray', JSON.stringify(tilesArray));
        }); 
    }

    drawTiles(row, col){
        // Clear the tile before drawing a new one
        const newTile = document.createElement("div");
        newTile.classList.add("tile-div");
        newTile.style.backgroundColor = colorValue[this.tilesArray[row][col]];
        if (this.tilesArray[row][col] !== 0){
            newTile.innerHTML = `${this.tilesArray[row][col]}`
        }
        newTile.style.color = color[this.tilesArray[row][col]]
        newTile.style.top = `${row * sizeTile}px`;
        newTile.style.left = `${col * sizeTile}px`;
        tilesDiv.appendChild(newTile);
    }

    generateInitialTiles(){
        // Generate random numbers for the tiles
        let row = Math.floor(Math.random() * 4);
        let column = Math.floor(Math.random() * 4);
      
        const arrayValue = this.tilesArray[row][column] === 0 ? this.tilesArray[row][column] = 2 : this.generateInitialTiles();
        // Fill the tile with the random value
        if (arrayValue === 2){
            this.drawTiles(row, column);
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
                    if (this.tilesArray[row][col] === 0 && this.tilesArray[row][prevColumn] !== 0){
                        this.tilesArray[row][col] = this.tilesArray[row][prevColumn];
                        this.tilesArray[row][prevColumn] = 0;
                        this.drawTiles(row, col);
                    }
                    if(this.tilesArray[row][col] !== this.tilesArray[row][prevColumn] && this.tilesArray[row][prevColumn] !== 0){
                        break;
                    }
                    if(this.tilesArray[row][col] === this.tilesArray[row][prevColumn]){
                        scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
                        this.tilesArray[row][col] *= 2;
                        this.tilesArray[row][prevColumn] = 0;
                        this.drawTiles(row, col);
                    }
                    
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
                    if (this.tilesArray[row][col] === 0 && this.tilesArray[row][prevColumn] !== 0){
                        this.tilesArray[row][col] = this.tilesArray[row][prevColumn];
                        this.tilesArray[row][prevColumn] = 0;
                        this.drawTiles(row, col);
                    }
                    // Break if 4 !== 8
                    if(this.tilesArray[row][col] !== this.tilesArray[row][prevColumn] && this.tilesArray[row][prevColumn] !== 0){
                        break;
                    }
                    if(this.tilesArray[row][col] === this.tilesArray[row][prevColumn]){
                        scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
                        this.tilesArray[row][col] *= 2;
                        this.tilesArray[row][prevColumn] = 0;
                        this.drawTiles(row, col);
                    }
                }
            }
        }
    }

    #moveTilesDown(){
        for (let row = 3; row >= 0; row--){
            for (let col = 3; col >= 0; col--){
                let prevRow = row  // Get the row
                // Start to iter from 3 to 0 and then combine or move the tile
                while (prevRow !== 0 && (this.tilesArray[prevRow - 1][col] === 0 || this.tilesArray[prevRow - 1][col] !== 0)){
                    prevRow--;
                    if (this.tilesArray[row][col] === 0 && this.tilesArray[prevRow][col] !== 0){
                        this.tilesArray[row][col] = this.tilesArray[prevRow][col];
                        this.tilesArray[prevRow][col] = 0;
                        this.drawTiles(row, col);
                    }
                    if(this.tilesArray[row][col] !== this.tilesArray[prevRow][col] && this.tilesArray[prevRow][col] !== 0){
                        break;
                    }
                    if(this.tilesArray[row][col] === this.tilesArray[prevRow][col]){
                        scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
                        this.tilesArray[row][col] *= 2;
                        this.tilesArray[prevRow][col] = 0;
                        this.drawTiles(row, col);
                    }
                    
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
                    if (this.tilesArray[row][col] === 0 && this.tilesArray[prevRow][col] !== 0){
                        this.tilesArray[row][col] = this.tilesArray[prevRow][col];
                        this.tilesArray[prevRow][col] = 0;
                        this.drawTiles(row, col);
                    }
                    if(this.tilesArray[row][col] !== this.tilesArray[prevRow][col] && this.tilesArray[prevRow][col] !== 0){
                        break;
                    }
                    if(this.tilesArray[row][col] === this.tilesArray[prevRow][col]){
                        scoreDiv.innerHTML = `Score ${score += this.tilesArray[row][col]}`
                        this.tilesArray[row][col] *= 2;
                        this.tilesArray[prevRow][col] = 0;
                        this.drawTiles(row, col);
                    }
                }
            }
        }
    }
}