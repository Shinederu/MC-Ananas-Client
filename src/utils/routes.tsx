import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { Navigate, Route } from "react-router-dom";


//Routes autorisées pour les anonymes
const anonymous = () => (
    <>
        <Route path="*" element={<Navigate to="/" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/" element={<Login />} />
    </>
)


const logged = () => (
    <>
        {anonymous()}
        <Route path="/dashboard" element={<Dashboard />} />
    </>
)

export const getRoutes = (permission: number) => {
    switch (permission) {
        case 1: //Cas utilisateur
            return logged();
        default: //Cas visiteur
            return anonymous();
    }


    return anonymous();
};