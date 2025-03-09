import Server from "@/pages/Server";
import Login from "@/pages/Login";
import { Navigate, Route } from "react-router-dom";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Modspacks from "@/pages/Modspacks";


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
        <Route path="/Users" element={<Users />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Modpack" element={<Modspacks />} />
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