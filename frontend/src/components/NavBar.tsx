import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    
    <nav className="bg-green text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity">
          <span className="text-white">Clínica</span> <span className="text-gray-200">Online</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <Link
            to="/"
            className="hover:text-green-200 transition-colors duration-300 font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/login"
            className="hover:text-green-200 transition-colors duration-300 font-medium mx-4"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="hover:text-green-200 transition-colors duration-300 font-medium"
          >
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
