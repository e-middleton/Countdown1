import { useState } from 'react';

// *** individual squares in the game board //
function Square( {value, onSquareClick, winLabel} ) {
  const winSquare = winLabel ? 'winSquare' : 'notWinSquare';

  return ( 
    <button className={`square ${winSquare}`} onClick={onSquareClick}> {value} </button>
  );
}

// *** the 3x3 grid of squares for the game board //
function Board( {xIsNext, squares, onPlay, winLabels} ) {
  let status;
  const winIndicies = calculateWinner(squares);

  if (winIndicies) {
    const winner = squares[calculateWinner(squares)[0]];
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) ) return; // if the square has already been filled, return early
    const nextSquares = squares.slice();
    // check active player
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
    onPlay(nextSquares);
  }

  return ( 
    <>
      <div className="status">{ status }</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} winLabel={winLabels[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} winLabel={winLabels[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} winLabel={winLabels[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} winLabel={winLabels[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} winLabel={winLabels[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} winLabel={winLabels[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} winLabel={winLabels[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} winLabel={winLabels[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} winLabel={winLabels[8]} />
      </div>
    </>
  );
}

// ** interactive state management for the game //
export default function Game() {
  const [winLabels, setWinLabels] = useState(Array(9).fill(false));

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    
    if (calculateWinner(nextSquares)) {
      const winIndicies = calculateWinner(nextSquares);
      const newWinLabels = winLabels.slice();
      newWinLabels[winIndicies[0]] = true;
      newWinLabels[winIndicies[1]] = true;
      newWinLabels[winIndicies[2]] = true;
      setWinLabels(newWinLabels);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-components">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} winLabels={winLabels} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{ moves }</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c]; // array of winning indicies
    }
  }
  return null;
}
