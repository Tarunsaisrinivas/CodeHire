import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobSearch from './pages/JobSearch'
import cards  from './pages/Cards'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobSearch/>
      
    </>
  )
}

export default App
