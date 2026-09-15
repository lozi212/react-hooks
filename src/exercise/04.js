
// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

// 💯 Extra Credit 2:
// Custom hook for localStorage
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key)

    return storedValue !== null ? JSON.parse(storedValue) : defaultValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  // 💯 Extra Credit 1 + 2:
  // Save the game history in localStorage.
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe-history',
    [Array(9).fill(null)],
  )

  // 💯 Extra Credit 3:
  // Keep track of the current position in history.
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe-current-step',
    0,
  )

  const currentSquares = history[currentStep]

  // Derived state
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    // Don't allow moves after a winner
    // or on an already occupied square.
    if (winner || currentSquares[square]) {
      return
    }

    // Make a copy of the current board.
    const squaresCopy = [...currentSquares]

    // Add X or O.
    squaresCopy[square] = nextValue

    // If we went backward and make a new move,
    // remove the old future history.
    const newHistory = history.slice(0, currentStep + 1)

    // Add the new board to history.
    newHistory.push(squaresCopy)

    setHistory(newHistory)
    setCurrentStep(newHistory.length - 1)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  // 💯 Extra Credit 3:
  // Move backward through the game.
  function goBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 💯 Extra Credit 3:
  // Move forward through the game.
  function goForward() {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // 💯 Extra Credit 3:
  // Create buttons for each move.
  const moves = history.map((squares, step) => {
    const description =
      step === 0 ? 'Go to game start' : `Go to move #${step}`

    return (
      <li key={step}>
        <button onClick={() => setCurrentStep(step)}>
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />

        <button className="restart" onClick={restart}>
          restart
        </button>

        <div>
          <button
            onClick={goBack}
            disabled={currentStep === 0}
          >
            Back
          </button>

          <button
            onClick={goForward}
            disabled={currentStep === history.length - 1}
          >
            Forward
          </button>
        </div>
      </div>

      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }

  return null
}

function App() {
  return <Game />
}

export default App

