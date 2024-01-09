import React, { useState } from 'react';

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

    // Function to determine if a cell should have a black background
    const isBlackBackground = (rowIndex, colIndex) => {
      // Logic to check for corner and center 3x3 submatrices
      const isInCornerOrCenter = (index) => (colIndex > 2 && colIndex < 6) ^ (rowIndex > 2 && rowIndex < 6);
      return isInCornerOrCenter(rowIndex) && isInCornerOrCenter(colIndex);
    };

    // Render the Sudoku grid
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      </>
    );
}

export default GridComponent;
