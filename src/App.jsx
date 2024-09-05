import { useState } from 'react'
import Color from "./Components/Color"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Color/>
    </>
  )
}

export default App
