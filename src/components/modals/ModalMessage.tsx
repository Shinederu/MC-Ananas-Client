import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { ModalContext } from "@/shared/context/ModalContext";

const MessageModal = () => {
    const modalCtx = useContext(ModalContext);

    if (!modalCtx.isOpen) return null;

    const [color, setColor] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        switch (modalCtx.type) {
            case "confirm":
                setTitle("Confirmation");
                setColor("#20c70e"); // Rouge foncé
                break;
            case "error":
                setTitle("Une erreur est survenue !");
                setColor("#b50909"); // Vert
                break;
            default:
                setTitle("Information");
                setColor("#ffe342"); // Jaune
                break;
        }
    }, [modalCtx.type]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#10101f] text-white rounded-lg p-6 max-w-7xl border" style={{ borderColor: color }}>
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-1 mb-1 gap-6" style={{ borderColor: color }}>
                    <h1 className="text-4xl font-extrabold tracking-tigh">
                        {title}
                    </h1>
                    <button onClick={() => modalCtx.setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="py-4">
                    <p className="text-gray-300">{modalCtx.message}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            modalCtx.setIsOpen(false);
                            if (modalCtx.onClose) modalCtx.onClose();
                        }}
                        className={`text-white py-2 px-4 rounded-md font-semibold shadow-md hover:scale-105 transition-transform`}
                        style={{ backgroundColor: color }}
                    >
                        Compris !
                    </button>
                </div>
            </div>
        </div >
    );
};

export default MessageModal;
