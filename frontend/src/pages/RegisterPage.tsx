import React, { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numero_telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [estatura, setEstatura] = useState<number | null>(null);
  const [peso, setPeso] = useState<number | null>(null);
  const [tipo_sangre, setTipoSangre] = useState<string | null>(null);
  const [alergias, setAlergias] = useState<string | null>(null);

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const [modal, setModal] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !numero_telefono || !fecha_nacimiento || !nombre_usuario || !contraseña) {
      setModal({ message: "Por favor llene los campos obligatorios marcados con *", type: "error" });
      return;
    }

    try {
      setLoading(true)
      const response = await fetch("/api/registro/paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        })
      })

      const data = await response.json()
      if (response.ok) {
        setModal({ message: data.message, type: "success" })
        setTimeout(() => navigate("/login"), 3000)
      } else {
        setModal({ message: data.error, type: "error" })
      }
    } catch (error) {
      console.log(error)
      setModal({ message: "Error de conexión con el servidor", type: "error" })
    } finally {
      setLoading(false)
    }

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
                <label className="block text-sm font-medium text-gray-700">Nombre completo <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={numero_telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento <span className="text-red-500">*</span></label>
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
                  value={estatura ?? ""}
                  onChange={(e) => setEstatura(e.target.value ? Number(e.target.value) : null)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  min={1}
                  value={peso ?? ""}
                  onChange={(e) => setPeso(e.target.value ? Number(e.target.value) : null)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de sangre</label>
                <input
                  type="text"
                  value={tipo_sangre ?? ""}
                  onChange={(e) => setTipoSangre(e.target.value ? e.target.value : null)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alergias</label>
                <textarea
                  value={alergias ?? ""}
                  onChange={(e) => setAlergias(e.target.value ? e.target.value : null)}
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
                <label className="block text-sm font-medium text-gray-700">Nombre de usuario <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={nombre_usuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña <span className="text-red-500">*</span></label>
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

export default RegisterPage;
