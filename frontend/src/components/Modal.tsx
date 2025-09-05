import React, { useEffect, useState } from "react";

interface ModalProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Autocierre a los 5s
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // esperar animación
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {/* Overlay solo si es error */}
      {type === "error" && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
      )}

      {/* Toast (Error o Success) */}
      <div
        className={`fixed bottom-5 right-5 z-50 transition-all duration-500 transform ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <div
          className={`bg-gray-100 opacity-95 rounded-lg p-4 w-80 shadow-lg relative border-2
                      ${
                        type === "error"
                          ? "border-red-500"
                          : "border-green-500"
                      }
                      transform transition-all duration-500 ${
                        visible ? "scale-100" : "scale-95"
                      }`}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute text-lg font-bold text-gray-600 top-1 right-3 hover:text-gray-800"
          >
            ×
          </button>

          {/* Título */}
          <h2
            className={`mb-2 text-base font-bold mt-2 ${
              type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {type === "error" ? "Error" : "Éxito"}
          </h2>

          {/* Mensaje */}
          <p className="mb-2 text-sm">{message}</p>

          {/* Barra de tiempo */}
          <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden mt-3">
            <div
              className={`h-full ${
                type === "error" ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: "100%", animation: "shrink 5s linear forwards" }}
            ></div>
          </div>
        </div>

        {/* Animación de la barra */}
        <style>
          {`
            @keyframes shrink {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Modal;
