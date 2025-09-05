import React from "react";

interface ModalProps {
    message: string;
    type: "error" | "success";
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div
                className={`bg-gray-100 opacity-90 rounded-lg p-6 max-w-sm w-full text-center shadow-lg relative
                ${type === "error" ? "border-red-500" : "border-green-500"} border-2 transform transition-transform duration-300 scale-100`}
            >
                {/* Botón de cerrar en esquina superior derecha */}
                <button
                    onClick={onClose}
                    className="absolute text-2xl font-bold text-gray-600 top-1 right-4 hover:text-gray-800"
                >
                    x
                </button>

                <h2
                    className={`mb-2 text-lg font-bold mt-3 ${
                        type === "error" ? "text-red-500" : "text-green-500"
                    }`}
                >
                    {type === "error" ? "Error" : "Éxito"}
                </h2>
                <p className="mb-4">{message}</p>
            </div>
        </div>
    );
};

export default Modal;
