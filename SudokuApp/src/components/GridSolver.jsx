
/*export function GridSolver(grid){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            console.log(grid,j)
            console.log(grid[i][j])
            if(grid[i][j] == 0){
                for(let n = 1; n <= 9; n++){
                    if(possible(i, j, n, grid)){
                        grid[i][j] = n;
                        if(GridSolver(grid)){
                            return; // If grid is solved, return true
                        }
                        grid[i][j] = 0; // Backtrack if not solved
                    }
                }
                return false; // Return false if no number fits (dead end)
            }
        } 
    }
    return true; // Return true if the entire grid is filled correctly
}


export function Alternates(x,y,grid){
    for(let i = 0; i<9; i++){
        for(let j = 0; j<9; j++){
            for(let n = 1; n<10; n++){
                if(possible(i,j,n,grid) && grid[i][j]!=n) return true;
            }
        }
    }
    return false;
}
*/
function possible(x, y, grid) {
    const n = grid[x][y];
    for (let i = 0; i < 9; i++) {
        if (grid[i][y] == n && i != x) return false;
    }
    for (let j = 0; j < 9; j++) {
        if (grid[x][j] == n && j != y) return false;
    }

    const cubeX = Math.floor(x / 3) * 3;
    const cubeY = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[cubeX + i][cubeY + j] == n && (cubeX + i != x || cubeY + j != y)) return false;
        }
    }
    return true;
}

function Validity(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] != 0) {
                if (!possible(i, j, grid)) return false;
            }
        }
    }
    return true;
}



// Javascript program for above approach

// N is the size of the 2D matrix N*N
let N = 9;

export function solveSudoku(grid){
	if(!Validity(grid)) return false;
	return solver(grid,0,0);
}

function solver(grid, row, col){


	if (row == N - 1 && col == N)
		return true;

	// Check if column value becomes 9 ,
	// we move to next row
	// and column start from 0
	if (col == N)
	{
		row++;
		col = 0;
	}

	// Check if the current position
	// of the grid already
	// contains value >0, we iterate
	// for next column
	if (grid[row][col] != 0)
		return solver(grid, row, col + 1);

	for(let num = 1; num < 10; num++)
	{
		
		// Check if it is safe to place
		// the num (1-9) in the given 
		// row ,col ->we move to next column
		if (isSafe(grid, row, col, num))
		{
			grid[row][col] = num;

			// Checking for next
			// possibility with next column
			if (solver(grid, row, col + 1))
				return true;
		}
		grid[row][col] = 0;
	}
	return false;
}

function print(grid)
{
	for(let i = 0; i < N; i++)
	{
		for(let j = 0; j < N; j++)
			document.write(grid[i][j] + " ");
			
		document.write("<br>");
	}
}

// Check whether it will be legal
// to assign num to the
// given row, col
function isSafe(grid, row, col, num)
{
	
	// Check if we find the same num
	// in the similar row , we
	// return false
	for(let x = 0; x <= 8; x++)
		if (grid[row][x] == num)
			return false;

	// Check if we find the same num
	// in the similar column ,
	// we return false
	for(let x = 0; x <= 8; x++)
		if (grid[x][col] == num)
			return false;

	// Check if we find the same num
	// in the particular 3*3
	// matrix, we return false
	let startRow = row - row % 3, 
		startCol = col - col % 3;
		
	for(let i = 0; i < 3; i++)
		for(let j = 0; j < 3; j++)
			if (grid[i + startRow][j + startCol] == num)
				return false;

	return true;
}
