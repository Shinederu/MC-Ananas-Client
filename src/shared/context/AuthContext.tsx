import { createContext, PropsWithChildren, useState } from 'react';

type AuthDataType = {
    isLoggedIn: boolean;
    permission: number;
    token: string;
    pk: number;
    pseudo: string;
    mail: string;
};

interface AuthContextType extends AuthDataType {
    setAuthData: (authData: Partial<AuthDataType>) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    permission: 0,
    token: '',
    pk: 0,
    pseudo: '',
    mail: '',
    setAuthData: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authData, setAuthData] = useState<AuthDataType>({
        isLoggedIn: false,
        permission: 0,
        token: '',
        pk: 0,
        pseudo: '',
        mail: '',
    });

    // Fonction qui met à jour seulement les champs nécessaires
    const updateAuthData = (newData: Partial<AuthDataType>) => {
        setAuthData((prev) => ({ ...prev, ...newData }));
    };

    const contextValue: AuthContextType = {
        ...authData, // Déstructure authData pour inclure toutes les valeurs directement
        setAuthData: updateAuthData, // Utilise la fonction de mise à jour
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};
