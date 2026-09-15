
// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // Create a ref to get access to the DOM node.
  const tiltRef = React.useRef()

  // Run after the component has been mounted.
  React.useEffect(() => {
    const tiltNode = tiltRef.current

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    // Clean up VanillaTilt when the component is unmounted.
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App

