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
// Function to determine if a cell should have a black background
const isBlackBackground = (rowIndex, colIndex) => {
  // Logic to check for corner and center 3x3 submatrices
  const isInCornerOrCenter = () => (colIndex > 2 && colIndex < 6) ^ (rowIndex > 2 && rowIndex < 6);
  return isInCornerOrCenter();
};

function GridComponent() {
  const [data, setData] = useState(initialData);
  const [numSelect, setNumSelect] = useState('');
  const [message, setMessage] = useState('');
  const gridSize = 9;

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
    setMessage("");
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
      setMessage('Sudoku solved successfully!'); 
    } else {
      // Handle unsolvable grid scenario
      setMessage("Grid cannot be solved");
      // Optionally, you can also update the state or alert the user here
    }
  };

  return(
  // Create a 9x9 grid
  <>
    <h2 style={{ color: 'red' }}>{message}</h2>
    <div>
      {Array.from({ length: 9 }, (_, i) => i + 1).map(number => (
        <button key={number} onClick={
          () => setNumSelect(number)} style={{
            backgroundColor: numSelect === number ? 'blue' : 'white', 
            color: numSelect === number ? 'white' : 'black', 
            border: '1px solid black'
        }}>
          {number}
        </button>
     ))}
     <button onClick={() => setNumSelect('')} style={{backgroundColor: 'gray', color: 'black' , border: '1px solid black'}}>Clear</button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <div key={colIndex} 
              onClick={() => handleInputChange(rowIndex, colIndex, numSelect)}
              style={
              { 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '40px', 
                  height: '40px', 
                  border: isBlackBackground(rowIndex, colIndex) ? '1px solid white' : '1px solid black',
                  color:  isBlackBackground(rowIndex, colIndex) ? 'white' : 'black', //Change text color, white on white = invisible
                  backgroundColor: isBlackBackground(rowIndex, colIndex) ? 'black' : 'white',
               }}>
                {cell === 0 ? "" : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={reset} style={{backgroundColor: 'rgb(212, 40, 40)', color: 'white' , border: '1px solid black'}}>Reset Board</button>
      <button onClick={solve} style={{backgroundColor: 'white', color: 'black' , border: '1px solid black'}}>Solve Sudoku</button>
    </>
  )
}



export default GridComponent;
