import React, { useState } from 'react';
import {solveSudoku} from './GridSolver';

// Initial state of the Sudoku grid, 9x9 matrix filled with zeros
const initialData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/* For test data
const initialData = [
  [0, 0, 3, 0, 0, 0, 0, 0, 0],
  [5, 8, 0, 2, 0, 0, 3, 0, 9],
  [2, 0, 0, 4, 0, 5, 8, 7, 1],
  [3, 7, 0, 0, 1, 0, 5, 9, 0],
  [8, 0, 0, 7, 4, 0, 1, 3, 0],
  [0, 2, 9, 0, 0, 8, 0, 0, 0],
  [6, 0, 0, 1, 0, 3, 4, 0, 7],
  [4, 0, 2, 0, 6, 0, 0, 0, 0],
  [0, 0, 0, 5, 2, 4, 6, 8, 0]
];*/

function GridComponent() {
    // State for storing the current state of the grid
    const [data, setData] = useState(initialData);

    // Function to handle input changes in the grid cells
    const handleInputChange = (rowIndex, colIndex, value) => {
      if (/^[1-9]$/.test(value) || value === '') {
        // Deep copy of the grid data to update state correctly
        let newData = data.map(row => [...row]);
        newData[rowIndex][colIndex] = value === '' ? 0 : parseInt(value, 10);
        setData(newData);
      }
    };

    // Function to reset the grid to its initial state
    const reset = () => {
      setData(initialData.map(row => [...row]));
    }

    const solve = () => {
      // Create a deep copy of the current grid state
      let gridCopy = data.map(row => [...row]);
      // Solve the grid
      const solvedGrid = solveSudoku(gridCopy)
    
      // Check if the grid is solved successfully
      if (solvedGrid) {
        // Update the state with the solved grid
        setData(gridCopy.map(row => [...row]));
      } else {
        // Handle unsolvable grid scenario
        console.log("Grid cannot be solved");
        // Optionally, you can also update the state or alert the user here
      }
    };

    // Function to determine if a cell should have a black background
    const isBlackBackground = (rowIndex, colIndex) => {
      // Logic to check for corner and center 3x3 submatrices
      const isInCornerOrCenter = () => (colIndex > 2 && colIndex < 6) ^ (rowIndex > 2 && rowIndex < 6);
      return isInCornerOrCenter();
    };

    // Render the Sudoku grid
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  value={cell === 0 ? "" : cell} // Empty string for 0
                  maxLength="1"
                  style={{ 
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                    backgroundColor: isBlackBackground(rowIndex, colIndex) ? 'black' : 'white',
                    color: isBlackBackground(rowIndex, colIndex) ? 'white' : 'black'
                  }}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                />
              ))}
            </div>
          ))}
        </div>
        <button onClick={reset}>Reset</button>
        <button onClick={solve}>Solve Sudoku</button>
      </>
    );
}



export default GridComponent;
