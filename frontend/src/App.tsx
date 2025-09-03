import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Inicio</Link>
        <Link to="/login" style={{ marginRight: '15px' }}>Iniciar Sesión</Link>
        <Link to="/registro" style={{ marginRight: '15px' }}>Registro</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
