//This will check it is possible for the current cell to exist in Sudoku
function possible(x, y, grid, n) {

	//Check the column and row for collisions
    for (let i = 0; i < 9; i++) {
        if (grid[i][y] == n && i != x) return false;
    }
    for (let j = 0; j < 9; j++) {
        if (grid[x][j] == n && j != y) return false;
    }

	//Check the current matrix for a collision
    const cubeX = Math.floor(x / 3) * 3;
    const cubeY = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[cubeX + i][cubeY + j] == n && (cubeX + i != x || cubeY + j != y)) return false;
        }
    }
    return true;
}

//This will check the validity of our inital grid, no invalid grids allowed
function Validity(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] != 0) {
                if (!possible(i, j, grid, grid[i][j])) return false;
            }
        }
    }
    return true;
}

let N = 9;

export function solveSudoku(grid){
	if(!Validity(grid)) return false;
	return solver(grid,0,0);
}

function solver(grid, row, col){


	if (row == N - 1 && col == N) return true;

	//If the cell is 9, reset the column
	if (col == N){
		row++;
		col = 0;
	}

	// Check if this cell is non zero, if it is, increment the column
	if (grid[row][col] != 0) return solver(grid, row, col + 1);

	//This cell is zero, put in the next possible number that won't break Sudoku
	for(let num = 1; num < 10; num++){
		
		//It's safe to place this num here? dew it
		if (possible(row, col, grid, num)){
			grid[row][col] = num;

			//Continue to next column
			if (solver(grid, row, col + 1))
				return true;
		}
		//If we've hit this, we reached a dead end, reset this cell
		//Try other possibilities
		grid[row][col] = 0;
	}

	return false;
}