// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Extra Credit #3: Custom Hook
function useLocalStorageState(key, initialValue) {
  // Extra Credit #1: Lazy state initialization
  const [state, setState] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key)

    // Extra Credit #4: Support different data types
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  })

  // Extra Credit #2: Effect dependencies
  React.useEffect(() => {
    // Extra Credit #4: Convert value to a string before saving
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // Use the custom hook instead of useState + useEffect directly
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>

      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App