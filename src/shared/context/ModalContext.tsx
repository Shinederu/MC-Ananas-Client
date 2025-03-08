import { createContext, PropsWithChildren, useState } from "react";

export interface ModalContextType {
    isOpen: boolean;
    type: "error" | "confirm" | "info";
    message: string;
    onClose?: () => void;
    setIsOpen: (open: boolean) => void;
    setType: (type: "error" | "confirm" | "info") => void;
    setMessage: (message: string) => void;
    setOnClose: (callback?: () => void) => void;
}

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    type: "info",
    message: "",
    onClose: undefined,
    setIsOpen: () => { },
    setType: () => { },
    setMessage: () => { },
    setOnClose: () => { },
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [type, setType] = useState<"error" | "confirm" | "info">("info");
    const [message, setMessage] = useState<string>("");
    const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

    const contextValue: ModalContextType = {
        isOpen,
        setIsOpen,
        type,
        setType,
        message,
        setMessage,
        onClose,
        setOnClose,
    };

    return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
