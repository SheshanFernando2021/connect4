import React, { useState } from 'react';
import './ConnectFour.css';

const ConnectFour = () => {
  const numRows = 6;
  const numCols = 7;
  const [board, setBoard] = useState(
    Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(null))
  );
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const directions = [
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 1, c: -1 },
    ];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cell = board[row][col];
        if (cell) {
          for (let { r, c } of directions) {
            let count = 0;
            for (let i = 0; i < 4; i++) {
              const newRow = row + r * i;
              const newCol = col + c * i;
              if (
                newRow >= 0 &&
                newRow < numRows &&
                newCol >= 0 &&
                newCol < numCols &&
                board[newRow][newCol] === cell
              ) {
                count++;
              } else {
                break;
              }
            }
            if (count === 4) {
              return cell;
            }
          }
        }
      }
    }

    return board.flat().every((cell) => cell !== null) ? 'Draw' : null;
  };

  const handleClick = (col) => {
    if (winner) return;

    const row = board
      .slice()
      .reverse()
      .find((r) => r[col] === null);
    if (!row) return;

    const newBoard = board.slice();
    newBoard[5 - board.slice().reverse().indexOf(row)][col] = isPlayerOneTurn
      ? 'Red'
      : 'Yellow';
    setBoard(newBoard);

    const currentWinner = checkWinner(newBoard);
    setWinner(currentWinner);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  const resetGame = () => {
    setBoard(
      Array(numRows)
        .fill(null)
        .map(() => Array(numCols).fill(null))
    );
    setIsPlayerOneTurn(true);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <h1>Connect Four</h1>
      {winner && (
        <h2>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h2>
      )}
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell}`}
              onClick={() => handleClick(colIndex)}
            ></div>
          ))
        )}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default ConnectFour;
