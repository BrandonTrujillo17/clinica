import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { usuario, logout: logoutContext } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const iniciales = usuario
    ? usuario.nombre
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "";

    const handleLogout = () => {
      logoutContext()
      navigate("/login")
    }

  return (
    <nav className="bg-[#0F4C81] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:scale-110 transition-all duration-300 transform"
        >
          CLINSYS
        </Link>

        {/* Botón hamburguesa visible desde md */}
        <button
          className="md:flex lg:hidden items-center text-white font-bold px-3 py-2 rounded-md hover:scale-110 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú desktop (lg en adelante) */}
        <div className="hidden lg:flex space-x-8 text-lg items-center">
          {!usuario && (
            <>
              <Link to="/" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Inicio
              </Link>
              <Link to="/login" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Registro
              </Link>
            </>
          )}

          {usuario?.rol === "Admin" && (
            <Link to="/admin" className="font-medium hover:scale-110 transition-all duration-300 transform">
              Panel Admin
            </Link>
          )}

          {usuario?.rol === "Doctor" && (
            <>
              <Link to="/agenda" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Agenda
              </Link>
              <Link to="/servicios_disponibles" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Servicios
              </Link>
              <Link to="/pacientes" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Pacientes
              </Link>
            </>
          )}

          {usuario?.rol === "Paciente" && (
            <>
              <Link to="/citas" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Mis citas
              </Link>
              <Link to="/servicios_disponibles" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Servicios disponibles
              </Link>
              <Link to="/agendar_cita" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Agendar cita
              </Link>
              <Link to="/historial" className="font-medium hover:scale-110 transition-all duration-300 transform">
                Historial médico
              </Link>
            </>
          )}

          {usuario && (
            <>
              <button onClick={handleLogout} className="ml-6 font-medium hover:scale-110 transition-all duration-300 transform">
                Cerrar Sesión
              </button>
              <div className="w-10 h-7 -ml-6 rounded-full bg-gray-200 text-blue-800 flex items-center justify-center font-bold">
                {iniciales}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil (md hasta lg) */}
      {menuOpen && (
        <div className="flex flex-col lg:hidden mt-4 space-y-3 text-lg">
          {!usuario && (
            <>
              <Link to="/" className="hover:scale-110 transition-all duration-300 transform">Inicio</Link>
              <Link to="/login" className="hover:scale-110 transition-all duration-300 transform">Iniciar Sesión</Link>
              <Link to="/registro" className="hover:scale-110 transition-all duration-300 transform">Registro</Link>
            </>
          )}

          {usuario?.rol === "Admin" && <Link to="/admin" className="hover:scale-110 transition-all duration-300 transform">Panel Admin</Link>}
          {usuario?.rol === "Doctor" && (
             <>
              <Link to="/agenda" className="font-medium hover:scale-110 transition-all duration-300 transform">Agenda</Link>
              <Link to="/servicios_disponibles" className="font-medium hover:scale-110 transition-all duration-300 transform">Servicios</Link>
              <Link to="/pacientes" className="font-medium hover:scale-110 transition-all duration-300 transform">Pacientes</Link>
            </>
          )}
          {usuario?.rol === "Paciente" && (
            <>
              <Link to="/citas" className="hover:scale-110 transition-all duration-300 transform">Mis citas</Link>
              <Link to="/servicios_disponibles" className="hover:scale-110 transition-all duration-300 transform">Servicios disponibles</Link>
              <Link to="/agendar_cita" className="hover:scale-110 transition-all duration-300 transform">Agendar cita</Link>
              <Link to="/historial" className="hover:scale-110 transition-all duration-300 transform">Historial médico</Link>
            </>
          )}

          {usuario && (
            <>
            <div className="justify-start">
              <button onClick={handleLogout} className="font-medium hover:scale-110 transition-all duration-300 transform">
                Cerrar Sesión
              </button>
              <div className="w-10 h-7 rounded-full bg-gray-200 text-blue-800 flex items-center justify-center font-bold">
                {iniciales}
              </div>
            </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
