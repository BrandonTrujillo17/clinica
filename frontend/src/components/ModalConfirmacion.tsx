import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmacion: React.FC<ConfirmModalProps> = ({
  open,
  title = "Confirmación",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-400 rounded-lg hover:scale-105 text-white font-medium transition-all"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-400 text-white font-medium rounded-lg hover:scale-105 transition-all"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
