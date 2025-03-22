import { createContext, PropsWithChildren, useState } from 'react';
/*
isLoggedIn
token
role
username
*/


type AuthDataType = {
    isLoggedIn: boolean;
    role: string;
    token: string;
    username: string;
};

interface AuthContextType extends AuthDataType {
    setAuthData: (authData: Partial<AuthDataType>) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    role: '',
    token: '',
    username: '',
    setAuthData: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authData, setAuthData] = useState<AuthDataType>({
        isLoggedIn: false,
        role: '',
        token: '',
        username: '',
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
