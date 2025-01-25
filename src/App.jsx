import { createBrowserRouter } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: []
  }
])

function App() {

  return (
    <>
      <div className='text-3xl font-bold underline'>Hello Ani!!!</div>
    </>
  )
}

export default App
