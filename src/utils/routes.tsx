import Server from "@/pages/Server";
import Login from "@/pages/Login";
import { Navigate, Route } from "react-router-dom";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Banned from "@/pages/Banned";
import Management from "@/pages/Management";


//Routes autorisées pour les anonymes
const anonymous = () => (
    <>
        <Route path="*" element={<Navigate to="/Login" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Login" element={<Login />} />
    </>
)

const banned = () => (
    <>
        <Route path="*" element={<Navigate to="/Ban" replace />} /> {/*Redirection pour les routes non-autorisées & inconnue */}
        <Route path="/Ban" element={<Banned />} />
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
        {minecraft()}
    </>
)

const admin = () => (
    <>
        {minecraft()}
        <Route path="/Banned" element={<Banned />} />
        <Route path="/Management" element={<Management />} />
    </>
)

export const getRoutes = (role: string) => {
    switch (role) {
        case "ROLE_BAN":
            return banned();
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