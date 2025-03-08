import Server from "@/pages/Server";
import Login from "@/pages/Login";
import { Navigate, Route } from "react-router-dom";


//Routes autorisées pour les anonymes
const anonymous = () => (
    <>
        <Route path="*" element={<Navigate to="/" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Login" element={<Login />} />
    </>
)


const logged = () => (
    <>
        <Route path="*" element={<Navigate to="/Server" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Server" element={<Server />} />
        <Route path="/Users" element={<Server />} />
        <Route path="/Profile" element={<Server />} />
        <Route path="/Modpack" element={<Server />} />
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