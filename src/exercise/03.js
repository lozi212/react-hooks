
// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// Name now manages its own state (Extra Credit: colocating state)
function Name() {
  const [name, setName] = React.useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

// FavoriteAnimal manages its own state
function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')

  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => setAnimal(event.target.value)}
      />
    </div>
  )
}

// Extra Credit: Display only needs animal
function Display({animal}) {
  return <div>{`Your favorite animal is :!`}</div>
}

function App() {
  return (
    <form>
      <Name />
      <FavoriteAnimal />
      <Display />
    </form>
  )
}

export default App

