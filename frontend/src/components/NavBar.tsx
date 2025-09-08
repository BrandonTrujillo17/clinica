import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { usuario, logout } = useAuth();
  const iniciales = usuario
    ? usuario.nombre
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "";

  return (

    <nav className="bg-[#0F4C81] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:scale-110 transition-all duration-300 transform"
        >
          <span className="text-white">CLINSYS</span>

        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <Link
            to="/"
            className="font-medium hover:scale-110 transition-all duration-300 transform"
          >
            Inicio
          </Link>
          {!usuario && (
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

          {usuario && usuario.rol === 'Admin' && (
            <Link to="/admin" className="font-medium hover:scale-110 transition-all duration-300 transform">
              Panel Admin
            </Link>
          )}

          {usuario && usuario.rol === 'Doctor' && (
            <Link to="/doctor" className='font-medium hover:scale-110 transition-all duration-300 transform'>
              Panel Doctor
            </Link>
          )}

          {usuario && usuario.rol === 'Paciente' && (
            <Link to="/paciente" className='font-medium hover:scale-110 transition-all duration-300 transform'>
              Panel Paciente
            </Link>
          )}

          {usuario && (
            <>
              <button
                onClick={logout}
                className="ml-6 font-medium hover:scale-110 transition-all duration-300 transform"
              >
                Cerrar Sesión
              </button>
              {/* <div className=" w-10 h-10 rounded-full bg-gray-200 text-blue-800 flex items-center justify-center font-bold">
                {iniciales}
              </div> */}
            </>
          )}
        </div>
      </div>

    </nav>
  );
};

export default NavBar;
