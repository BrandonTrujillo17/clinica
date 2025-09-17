import { useEffect, useState } from "react";
import CardServicio from "../components/CardServicio";
import RegistrarEditarServicio from "../components/RegistrarEditarServicio";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { SquarePlus } from "lucide-react";

export interface Servicio {
  id: number;
  nombre_servicio: string;
  descripcion_servicio: string;
  costo_servicio: number;
  comentarios_adicionales?: string;
  medicos: number[];
}

interface Medico {
  id: number;
  nombre: string;
}

const ServiciosDisponibles = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [medicosDisponibles, setMedicosDisponibles] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/servicios");
        const data = await res.json();
        const serviciosMapeados: Servicio[] = data.map((s: any) => ({
          id: s.id,
          nombre_servicio: s.nombre_servicio,
          descripcion_servicio: s.descripcion_servicio,
          costo_servicio: Number(s.costo_servicio),
          comentarios_adicionales: s.comentarios_adicionales,
          medicos: s.medicos.filter((m: number | null) => m !== null), // eliminar null
        }));
        setServicios(serviciosMapeados);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        setModal({message:"Error al obtener servicios", type:"error"})
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        setLoading(true);
        const res = await fetch("api/medicos-disponibles");
        const data = await res.json()
        setMedicosDisponibles(data);
      } catch (error) {
        console.log("Error al obtener los médicos: ", error)
        setModal({message:"Error al obtener médicos", type:"error"})
      }finally{
        setLoading(false);
      }
    }

    fetchMedicos();

  }, []);

  const handleUpdate = async (updatedServicio: Servicio) => {
    if (
      !updatedServicio.nombre_servicio?.trim() ||
      !updatedServicio.descripcion_servicio?.trim() ||
      !updatedServicio.costo_servicio ||
      updatedServicio.medicos.length === 0
    ) {
      setModal({ message: "Por favor llena los campos marcados con *", type: "error" })
      return false;
    }
    try {
      setLoading(true)
      const res = await fetch(`/api/actualizar-servicio/${updatedServicio.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedServicio)
      });

      const data = await res.json()
      if (res.ok) {
        setModal({ message: data.message, type: "success" })
        const serviciosRes = await fetch("/api/servicios");
        const serviciosData = await serviciosRes.json();
        setServicios(serviciosData);
      } else {
        setModal({ message: data.error, type: "error" })
      }
    } catch (error) {
      console.log("Error al actualizar servicio: ", error)
      setModal({ message: "Error al actualizar el servicio", type: "error" })
    } finally {
      setLoading(false)
    }
  };

  const handleRegister = async (nuevoServicio: Servicio) => {
    if (
      !nuevoServicio.nombre_servicio?.trim() ||
      !nuevoServicio.descripcion_servicio?.trim() ||
      !nuevoServicio.costo_servicio ||
      nuevoServicio.medicos.length === 0
    ) {
      setModal({ message: "Por favor llena los campos marcados con *", type: "error" })
      return false;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/registrar-servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
      });

      const data = await res.json()

      if (res.ok) {
        setModal({ message: data.message, type: 'success' });
        const serviciosRes = await fetch("/api/servicios");
        const serviciosData = await serviciosRes.json();
        setServicios(serviciosData);
      } else {
        setModal({ message: data.error, type: "error" })
      }
    } catch (error) {
      console.error("Error al registrar servicio:", error);
      setModal({ message: "Error al registrar el servicio", type: 'error' })
    } finally{
      setLoading(false)
    }
  };


  if (loading) return <div className="pt-85"><p className="text-center text-gray-500">Cargando servicios...</p></div>;

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-10 text-center text-[#0F4C81]">Servicios Disponibles</h1>
        <div className="text-end mb-5">
          <button
            className="px-4 py-2 bg-[#1E8854] text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-all inline-flex items-center gap-3"
            onClick={() => setOpen(true)}>
            <SquarePlus className="w-5 h-5" />
            <span>Nuevo servicio</span>
          </button>
        </div>

        <RegistrarEditarServicio
          open={open}
          onClose={() => setOpen(false)}
          servicio={undefined}
          medicosDisponibles={medicosDisponibles}
          onSubmit={handleRegister}
        />

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <CardServicio
              key={servicio.id}
              id={servicio.id}
              nombre_servicio={servicio.nombre_servicio}
              descripcion_servicio={servicio.descripcion_servicio}
              costo_servicio={servicio.costo_servicio}
              comentarios_adicionales={servicio.comentarios_adicionales}
              medicos={servicio.medicos}
              medicosDisponibles={medicosDisponibles}
              onUpdate={handleUpdate}
            />
          ))}
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
    </>
  );
};

export default ServiciosDisponibles;
