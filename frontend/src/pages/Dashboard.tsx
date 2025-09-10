import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardPaciente from "../components/DashboardPaciente";
import DashboardDoctor from "../components/DashboardDoctor";

const Dashboard = () => {
    const navigate = useNavigate();
    const { usuario } = useAuth();

    if (!usuario) {
        navigate("/login");
        return null;
    }


    return (
            <div className="p-6">
                <h1 className="text-[#0F4C81] text-2xl font-bold text-center py-10">
                    Bienvenido {usuario.nombre} 👋
                </h1>

                {usuario?.rol === "Paciente" && <DashboardPaciente />}

                {usuario?.rol === "Doctor" && <DashboardDoctor/>}

                {usuario?.rol === "Admin" && (
                    <div>
                        <button onClick={() => navigate("/usuarios")}>Gestión de usuarios</button>
                        <button onClick={() => navigate("/reportes")}>Reportes</button>
                    </div>
                )}
            </div>
    );
};

export default Dashboard;
