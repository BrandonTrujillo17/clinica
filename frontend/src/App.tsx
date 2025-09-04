import { Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NavBar from './components/NavBar';

function App() {
  return (
     
      <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-100 ">
        <NavBar />
        
        {/* Contenedor principal que centra el contenido de las rutas */}
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
  )
}

export default App
