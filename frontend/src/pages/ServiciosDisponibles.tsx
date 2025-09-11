import { useEffect, useState } from "react";
import CardServicio from "../components/CardServicio";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

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

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await fetch("/api/servicios");
        const data = await res.json();
        const serviciosMapeados: Servicio[] = data.map((s: any) => ({
          id: s.id,
          nombre: s.nombre_servicio,
          descripcion: s.descripcion_servicio,
          precio: Number(s.costo_servicio),
          comentarios: s.comentarios_adicionales,
          medicos: s.medicos.filter((m: number | null) => m !== null), // eliminar null
        }));
        setServicios(serviciosMapeados);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await fetch("api/medicos");
        const data = await res.json()
        setMedicosDisponibles(data);
      } catch (error) {
        console.log("Error al obtener los médicos: ", error)
      }
    }

    fetchMedicos();

  }, []);

   const handleUpdate = async (updatedServicio: Servicio) => {
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
        setModal({ message: data.message, type: "error" })
      }
    } catch (error) {
      console.log("Error al actualizar servicio: ", error)
      setModal({ message: "Error al actualizar el servicio", type: "error" })
    } finally {
      setLoading(false)
    }

  };

  if (loading) return <div className="pt-85"><p className="text-center text-gray-500">Cargando servicios...</p></div>;

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-10 text-center text-[#0F4C81]">Servicios Disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <CardServicio
              key={servicio.id}
              id={servicio.id}
              nombre={servicio.nombre_servicio}
              descripcion={servicio.descripcion_servicio}
              costo={servicio.costo_servicio}
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
