import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { usuario } = useAuth();

    if (!usuario) {
        navigate("/login");
        return null;
    }


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                Bienvenido {usuario.nombre} 👋
            </h1>

            {usuario.rol === "Paciente" && (
                <div>
                    <button onClick={() => navigate("/citas")}>Mis citas</button>
                    <button onClick={() => navigate("/historial")}>Historial médico</button>
                </div>
            )}

            {usuario.rol === "Doctor" && (
                <div>
                    <button onClick={() => navigate("/agenda")}>Agenda diaria</button>
                    <button onClick={() => navigate("/pacientes")}>Mis pacientes</button>
                </div>
            )}

            {usuario.rol === "Admin" && (
                <div>
                    <button onClick={() => navigate("/usuarios")}>Gestión de usuarios</button>
                    <button onClick={() => navigate("/reportes")}>Reportes</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
