import { useNavigate } from "react-router-dom";
import { Calendar, ClipboardList, Activity, Stethoscope } from  "lucide-react";

const DashboardPaciente = () => {
  const navigate = useNavigate();

  const opciones = [
    { nombre: "Mis citas", ruta: "/citas", icon: Calendar, color: "bg-blue-100 text-blue-700" },
    { nombre: "Servicios disponibles", ruta: "/servicios_disponibles", icon: Stethoscope, color: "bg-green-100 text-green-700" },
    { nombre: "Agendar cita", ruta: "/agendar_cita", icon: ClipboardList, color: "bg-yellow-100 text-yellow-700" },
    { nombre: "Historial médico", ruta: "/historial", icon: Activity, color: "bg-purple-100 text-purple-700" },
  ];

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
};

export default DashboardPaciente;
