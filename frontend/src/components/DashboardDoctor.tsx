import { useNavigate } from "react-router-dom";
import { Calendar, User, Stethoscope } from  "lucide-react";

const DashboardDoctor = () => {
    const navigate = useNavigate()

    const opciones = [
        { nombre: "Agenda", ruta: "/agenda", icon: Calendar, color: "bg-green-100 text-green-700" },
        { nombre: "Servicios", ruta: "/servicios_disponibles", icon: Stethoscope, color: "bg-blue-100 text-blue-700" },
        { nombre: "Pacientes", ruta: "/pacientes", icon: User, color: "bg-purple-100 text-purple-700" }
    ]

    return (
        <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {opciones.map(({ nombre, ruta, icon: Icon, color }) => (
          <button
            key={nombre}
            onClick={() => navigate(ruta)}
            className={`flex items-center gap-4 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:scale-105 ${color}`}
          >
            <Icon size={32} />
            <span className="text-lg font-medium">{nombre}</span>
          </button>
        ))}
      </div>
    </div>
    );
}

export default DashboardDoctor;