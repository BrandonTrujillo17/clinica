import React, { useState } from "react";
import Modal from "../components/Modal";

const RegisterPage = () => {
  const [step, setStep] = useState(1);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numero_telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [tipo_sangre, setTipoSangre] = useState("");
  const [alergias, setAlergias] = useState("");

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const [modal, setModal] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email) {
      setModal({ message: "Por favor completa todos los campos obligatorios", type: "error" });
      return;
    }
    setModal({ message: "Registro exitoso", type: "success" });

    console.log("Datos de registro:", {
      nombre,
      email,
      numero_telefono,
      fecha_nacimiento,
      estatura,
      peso,
      tipo_sangre,
      alergias,
      nombre_usuario,
      contraseña,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-2xl">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-center text-[#0F4C81] mb-6">
          Registro de Paciente
        </h1>

        {/* Subtítulo dinámico */}
        <h3 className="text-xl text-center text-[#0F4C81] mb-3">
          {step === 1 ? "Datos personales" : "Datos de inicio de sesión"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paso 1 → Datos personales */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  value={numero_telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={fecha_nacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Estatura (cm)</label>
                <input
                  type="number"
                  min={1}
                  value={estatura}
                  onChange={(e) => setEstatura(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de sangre</label>
                <input
                  type="text"
                  value={tipo_sangre}
                  onChange={(e) => setTipoSangre(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alergias</label>
                <textarea
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div className="flex justify-end md:col-span-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-[#0F4C81] text-white font-medium rounded-lg shadow-md hover:bg-[#0a3861] transition-all"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 → Datos de inicio de sesión */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                <input
                  type="text"
                  value={nombre_usuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 font-medium text-gray-700 transition-all bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  ← Atrás
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0F4C81] text-white font-medium rounded-lg shadow-md hover:bg-[#0a3861] transition-all"
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
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

export default RegisterPage;
