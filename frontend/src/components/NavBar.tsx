import { Link } from 'react-router-dom';

const NavBar = () => {
  return (

    <nav className="bg-[#0F4C81] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:scale-110 transition-all duration-300 transform"
        >
          <span className="text-white">Clínica</span>{" "}
          <span className="text-gray-200">Online</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <Link
            to="/"
            className="font-medium hover:scale-110 transition-all duration-300 transform"
          >
            Inicio
          </Link>
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
        </div>
      </div>

    </nav>
  );
};

export default NavBar;
