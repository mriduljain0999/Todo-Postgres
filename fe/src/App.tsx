import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Signup'
import { Landing } from './Landing'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/landing' element={<Landing />} />
    </Routes>
  </BrowserRouter>
}

export default App
