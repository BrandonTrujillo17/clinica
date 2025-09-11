import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SquarePen, Trash2 } from "lucide-react";
import RegistrarEditarServicio from "./RegistrarEditarServicio";
import type { Servicio } from "../pages/ServiciosDisponibles";

interface CardServicioProps {
  id: number
  nombre: string;
  descripcion: string;
  costo: number;
  comentarios_adicionales?: string;
  medicos: number[];
  medicosDisponibles: { id: number, nombre: string }[];
  onUpdate: (updatedServicio: Servicio) => void;
}

const CardServicio: React.FC<CardServicioProps> = ({ id, nombre, descripcion, costo, comentarios_adicionales, medicos, medicosDisponibles, onUpdate }) => {
  const { usuario } = useAuth();
  const [open, setOpen] = useState(false);
 


  const servicio = {
    id: id,
    nombre: nombre,
    descripcion: descripcion,
    precio: costo,
    comentarios: comentarios_adicionales,
    medicos: medicos,
    medicosDisponibles: medicosDisponibles,
  }


  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow h-full">
        <h2 className="text-lg font-bold text-[#1E8854]">{nombre}</h2>
        <p className="text-gray-600 mt-2">{descripcion}</p>
        <p className="text-gray-900 font-semibold mt-4">${Number(costo).toFixed(2)}</p>
        {comentarios_adicionales && (
          <p className="text-sm text-gray-500 mt-2 italic mb-4">{comentarios_adicionales}</p>
        )}

        {usuario?.rol === "Doctor" && (
          <div className="grid grid-cols-2 gap-3 mt-auto ">
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-gray-400 shadow-lg text-white font-medium rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <SquarePen className="w-5 h-5" />
              <span>Editar</span>
            </button>

            <RegistrarEditarServicio
              open={open}
              onClose={() => setOpen(false)}
              servicio={servicio}
              medicosDisponibles={medicosDisponibles}
              onSubmit={onUpdate}
            />

            <button
              onClick={() => console.log("Eliminar servicio:", nombre)}
              className="px-4 py-2 shadow-lg bg-red-400 text-white font-medium rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Trash2 className="w-5 h-5" />
              <span>Eliminar</span>
            </button>
          </div>
        )}
      </div>
    </>

  );
};

export default CardServicio;
