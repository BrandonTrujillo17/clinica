import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const [modal, setModal] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre_usuario || !contraseña) {
      setModal({ message: "Por favor llene todos los campos", type: "error" })
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario,
          contraseña
        })

      })
      const data = await response.json()
      if (response.ok) {
        setModal({ message: data.message, type: "success" })

        login({
          id: data.id,
          nombre: data.nombre,
          rol: data.rol, // Admin | Doctor | Paciente
        });


        // guardar info en localStorage (para sesión)
        localStorage.setItem("usuario", JSON.stringify({
          id: data.id,
          rol: data.rol,
          nombre: data.nombre,
        }));


        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        setModal({ message: data.error, type: "error" })
      }

    } catch (error) {
      console.log("Error: " + error)
      setModal({ message: "Error al iniciar sesión", type: "error" })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-center text-3xl font-extrabold text-[#0F4C81]">
          Iniciar Sesión
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nombre_usuario" className="sr-only">
                Usuario
              </label>
              <input
                id="nombre_usuario"
                name="nombre_usuario"
                type="text"
                autoComplete="nombre_usuario"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contraseña" className="sr-only">
                Contraseña
              </label>
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                autoComplete="current-password"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
          </div>

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
             text-white bg-[#0F4C81] 
             hover:[background-color:#0a3861ff] hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4C81] 
             transition duration-300 transform "
            >
              Iniciar Sesión
            </button>

          </div>
        </form>

        {/* Enlace para registrarse */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="inline-block font-medium text-[#1E8854] hover:scale-102 hover:text-[#0F4C81] transition-all duration-300 transform ">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
      <Loading show={loading} />
      {modal && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={() => setModal(null)}
        />
      )}
    </div>

  );
};

export default LoginPage;