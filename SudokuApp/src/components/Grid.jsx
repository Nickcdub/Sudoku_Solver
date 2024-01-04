import React, { useState } from 'react';

function isInCorner(rowIndex, colIndex){
    if(rowIndex>2 && rowIndex<6) return false;
    if((colIndex>2 && colIndex<6) ^ (rowIndex>2 && rowIndex<6)) return false;
}

function GridComponent({ initialData }) {
    const [data, setData] = useState(initialData);

    const handleInputChange = (rowIndex, colIndex, value) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = value;
        setData(newData);
    };
  
    const isBlackBackground = (rowIndex, colIndex) => {
          // Check for corner and center 3x3 submatrices
    const isInCornerOrCenter = (index) => (colIndex>2 && colIndex<6) ^ (rowIndex>2 && rowIndex<6);
    return isInCornerOrCenter(rowIndex) && isInCornerOrCenter(colIndex);
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {initialData.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
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
    );
  }

export default GridComponent;
