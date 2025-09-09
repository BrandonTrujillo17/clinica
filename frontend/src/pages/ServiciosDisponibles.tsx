import { useEffect, useState } from "react";
import CardServicio from "../components/CardServicio";

interface Servicio {
  id: number;
  nombre_servicio: string;
  descripcion_servicio: string;
  costo_servicio: number;
  comentarios_adicionales?: string;
}

const ServiciosDisponibles = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await fetch("/api/servicios");
        const data = await res.json();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) return <div className="pt-95"><p className="text-center text-gray-500">Cargando servicios...</p></div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#0F4C81]">Servicios Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((servicio) => (
          <CardServicio
            key={servicio.id}
            nombre={servicio.nombre_servicio}
            descripcion={servicio.descripcion_servicio}
            costo={servicio.costo_servicio}
            comentarios_adicionales={servicio.comentarios_adicionales}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiciosDisponibles;
