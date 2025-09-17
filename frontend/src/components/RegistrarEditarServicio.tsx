import { useState, useEffect } from "react"

interface Servicio {
    id?: number
    nombre_servicio: string
    descripcion_servicio: string
    costo_servicio: number
    comentarios_adicionales?: string
    medicos: number[]
}

interface RegistrarEditarServicioProps {
    open: boolean
    onClose: () => void
    servicio?: Servicio
    medicosDisponibles: { id: number; nombre: string }[]
    onSubmit: (data: Servicio) => void
}

export default function RegistrarEditarServicio({
    open,
    onClose,
    servicio,
    medicosDisponibles,
    onSubmit,
}: RegistrarEditarServicioProps) {
    const [nombre_servicio, setNombre] = useState("")
    const [descripcion_servicio, setDescripcion] = useState("")
    const [costo_servicio, setCosto] = useState<number | string>("")
    const [comentarios_adicionales, setComentarios] = useState("")
    const [medicos, setMedicos] = useState<number[]>([])

    // Si es edición, precargar datos
    useEffect(() => {
        if (servicio) {
            setNombre(servicio.nombre_servicio)
            setDescripcion(servicio.descripcion_servicio)
            setCosto(servicio.costo_servicio)
            setComentarios(servicio.comentarios_adicionales? servicio.comentarios_adicionales : "")
            setMedicos(servicio.medicos)
        } else {
            setNombre("")
            setDescripcion("")
            setCosto("")
            setComentarios("")
            setMedicos([])
        }
    }, [servicio, open])

    const handleToggleMedico = (id: number) => {
        setMedicos((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        )
    }

    const handleSubmit = () => {
        onSubmit({
            id: servicio?.id,
            nombre_servicio,
            descripcion_servicio,
            costo_servicio: Number(costo_servicio),
            comentarios_adicionales,
            medicos,
        })
        onClose()
    }

    if (!open) return null // si no está abierto, no mostrar nada

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-[#0F4C81]">
                    {servicio ? "Editar servicio" : "Registrar servicio"}
                </h2>

                <div className="space-y-4 ">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10 p-2"
                            value={nombre_servicio}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción<span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full border border-gray-300 shadow-sm focus:outline-none  focus:ring-[#1E8854] focus:border-[#1E8854] rounded-lg focus:z-10 p-2"
                            value={descripcion_servicio}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio<span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1e8854] focus:z-10 p-2"
                            value={costo_servicio}
                            onChange={(e) => setCosto(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios adicionales</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1E8854] focus:border-[#1E8854] focus:z-10  p-2"
                            value={comentarios_adicionales}
                            onChange={(e) => setComentarios(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Médicos<span className="text-red-500">*</span></label>
                        <div className="mt-2 max-h-20 border border-gray-300 shadow-sm rounded-lg grid grid-cols-2 overflow-y-auto space-y-2 p-2">
                            {medicosDisponibles.map((m) => (
                                <label key={m.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={medicos.includes(m.id)}
                                        onChange={() => handleToggleMedico(m.id)}
                                        className="h-4 w-4 hover:scale-110 transition-all"
                                    />
                                    <span className="select-none">{m.nombre}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-all"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-[#0F4C81] font-medium text-white rounded-lg shadow-lg hover:scale-105 transition-all"
                        onClick={handleSubmit}
                    >
                        {servicio ? "Actualizar" : "Registrar"}
                    </button>
                </div>
            </div>
        </div>
    )
}
