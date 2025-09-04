import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', { email, contraseña });
    // Aquí irá la lógica de conexión con el backend.
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
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10 sm:text-sm"
                placeholder="Dirección de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
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
    </div>
  );
};

export default LoginPage;