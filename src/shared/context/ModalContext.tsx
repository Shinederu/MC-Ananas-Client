import { createContext, PropsWithChildren, useState } from "react";

export interface ModalContextType {
    isOpen: boolean;
    type: "error" | "confirm" | "info";
    message: string;
    subMessage: string;
    onClose?: () => void;
    open: (message: string, type?: "error" | "confirm" | "info", subMessage?: string, onClose?: () => void) => void;
    close: () => void;
}

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    type: "info",
    message: "",
    subMessage: "",
    onClose: undefined,
    open: () => { },
    close: () => { },
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [type, setType] = useState<"error" | "confirm" | "info">("info");
    const [message, setMessage] = useState<string>("");
    const [subMessage, setSubMessage] = useState<string>("");
    const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

    const open = (
        message: string,
        type?: "error" | "confirm" | "info",
        subMessage?: string,
        onClose?: () => void
    ) => {
        setMessage(message);
        setSubMessage(subMessage ?? "");
        setType(type ?? "info");
        setOnClose(() => onClose);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setMessage("");
        setSubMessage("");
        setType("info");
        if (onClose) onClose();
        setOnClose(undefined);
    }

    const contextValue: ModalContextType = {
        isOpen,     // État d'ouverture (afficher/caché)
        type,       // Type
        message,    // Message
        subMessage, // Message Secondaire
        onClose,    // Action à la fermeture
        open,       // Ouverture
        close,      // Fermeture
    };

    return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
