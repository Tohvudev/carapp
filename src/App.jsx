import { useState } from 'react'
import './App.css'
import Carlist from './components/Carlist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Carlist></Carlist>
    </>
  )
}

export default App
