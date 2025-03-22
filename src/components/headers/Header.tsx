import { Link } from "react-router-dom";
import Title from "../decoration/Title";
import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";

const Header = () => {

    var authCtx = useContext(AuthContext);

    return (
        <>
            <header className="flex flex-col items-center">
                <Title size={1} title="ShinedePlay" />
                <nav>
                    {/* Conteneur des liens de navigation */}
                    <div className="absolute left-1/2 -translate-x-1/2 space-x-10">
                        <div className="flex gap-4">
                            {authCtx.role == "ROLE_MINECRAFT" || authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ? <> <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Server">Serveur</Link> <p>|</p></> : ""}
                            {authCtx.role == "ROLE_MINECRAFT" || authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ? <> <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Users">Utilisateurs</Link> <p>|</p></> : ""}
                            {authCtx.role == "ROLE_USER" || authCtx.role == "ROLE_MINECRAFT" || authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ? <> <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Profile">Profile</Link></> : ""}
                            {authCtx.role == "ROLE_ADMIN" ? <> <p>|</p> <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Modpack">Modpack</Link></> : ""}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
