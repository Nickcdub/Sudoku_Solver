import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GridComponent from './components/Grid'
import Reset from './components/Reset'

const initialGridState = [
  [9, 5, 0, 0, 7, 0, 0, 0, 0],
  [3, 0, 0, 2, 0, 0, 0, 0, 6],
  [0, 4, 0, 0, 0, 8, 2, 0, 0],
  [0, 0, 0, 9, 0, 0, 0, 4, 0],
  [0, 0, 3, 0, 0, 0, 5, 0, 0],
  [0, 9, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 7, 0, 0, 0, 0, 2, 0],
  [1, 0, 0, 0, 0, 7, 0, 0, 8],
  [0, 0, 0, 0, 3, 0, 0, 9, 0]
];



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GridComponent />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}



export default App
