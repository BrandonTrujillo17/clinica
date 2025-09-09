import React from "react";

interface CardServicioProps {
  nombre: string;
  descripcion: string;
  costo: number;
  comentarios_adicionales?: string;
}

const CardServicio: React.FC<CardServicioProps> = ({ nombre, descripcion, costo, comentarios_adicionales }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-bold text-[#1E8854]">{nombre}</h2>
      <p className="text-gray-600 mt-2">{descripcion}</p>
      <p className="text-gray-900 font-semibold mt-4">${Number(costo).toFixed(2)}</p>
      {comentarios_adicionales && (
        <p className="text-sm text-gray-500 mt-2 italic">{comentarios_adicionales}</p>
      )}
    </div>
  );
};

export default CardServicio;
