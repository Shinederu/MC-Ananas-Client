import Server from "@/pages/Server";
import Login from "@/pages/Login";
import { Navigate, Route } from "react-router-dom";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Modspacks from "@/pages/Modspacks";


//Routes autorisées pour les anonymes
const anonymous = () => (
    <>
        <Route path="*" element={<Navigate to="/Login" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Login" element={<Login />} />
    </>
)

const logged = () => (
    <>
        <Route path="*" element={<Navigate to="/Profile" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Profile" element={<Profile />} />
    </>
)


const minecraft = () => (
    <>
        <Route path="*" element={<Navigate to="/Server" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Server" element={<Server />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Profile" element={<Profile />} />
    </>
)

const friends = () => (
    <>
        {logged()}
    </>
)

const admin = () => (
    <>
        {minecraft()}
        <Route path="/Modpack" element={<Modspacks />} />
    </>
)

export const getRoutes = (role: string) => {
    switch (role.trim()) {
        case "ROLE_USER":
            return logged();
        case "ROLE_MINECRAFT":
            return minecraft();
        case "ROLE_FRIEND":
            return friends();
        case "ROLE_ADMIN":
            return admin();
        default:
            return anonymous();
    }
};