import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (

    <nav className="bg-[#0F4C81] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:scale-110 transition-all duration-300 transform"
        >
          <span className="text-white">CLINSYS</span>{" "}

        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <Link
            to="/"
            className="font-medium hover:scale-110 transition-all duration-300 transform"
          >
            Inicio
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                className="font-medium hover:scale-110 transition-all duration-300 transform"
              >
                Iniciar Sesión
              </Link>

              <Link
                to="/registro"
                className="font-medium hover:scale-110 transition-all duration-300 transform"
              >
                Registro
              </Link>
            </>
          )}

          {user && user.role === 'Admin' && (
            <Link to="/admin" className="hover:text-gray-200 transition-colors">
              Panel Admin
            </Link>
          )}

          {user && user.role === 'Doctor' && (
            <Link to="/doctor" className='hover:text-gray-200 transition-colors'>
              Panel Doctor
            </Link>
          )}

          {user && user.role === 'Paciente' && (
            <Link to="/paciente" className='hover:text-gray-200 transition-colors'>
              Panel Paciente
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="ml-4 hover:text-gray-200 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>

    </nav>
  );
};

export default NavBar;
