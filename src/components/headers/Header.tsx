import { Link } from "react-router-dom";
import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";

const Header = () => {

    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const logout = async () => {
        await sendRequest({
            key: 3,
            url: import.meta.env.VITE_PLAY_API_URL + '/logout',
            method: 'GET',
            onSuccess: () => {
                authCtx.setAuthData({
                    isLoggedIn: false,
                    role: '',
                    token: '',
                    username: '',
                });
            },
            onError: () => {
                modalCtx.setMessage("Impossible de contacter le serveur... Réessayer plus tard !");
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });

    };

    return (
        <>
            <header className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
                <div className="flex flex-col items-center py-4">
                    <h1 className="text-white tracking-wider text-3xl font-bold drop-shadow" >ShinedePlay</h1>
                </div>

                <div className="grid grid-cols-3 items-center w-full px-6 pb-2">
                    <div></div>

                    <nav className="justify-self-center">
                        <div className="flex gap-6 text-white font-medium items-center">
                            {authCtx.role === "ROLE_MINECRAFT" || authCtx.role === "ROLE_FRIEND" || authCtx.role === "ROLE_ADMIN" ? (
                                <>
                                    <Link to="/Server" className="hover:text-white hover:underline transition">Serveur</Link>
                                    <span className="text-white/40">|</span>
                                    <Link to="/Users" className="hover:text-white hover:underline transition">Utilisateurs</Link>
                                </>
                            ) : null}
                            {authCtx.role === "ROLE_USER" || authCtx.role === "ROLE_MINECRAFT" || authCtx.role === "ROLE_FRIEND" || authCtx.role === "ROLE_ADMIN" ? (
                                <>
                                    <span className="text-white/40">|</span>
                                    <Link to="/Profile" className="hover:text-white hover:underline transition">Profil</Link>
                                </>
                            ) : null}
                            {authCtx.role === "ROLE_ADMIN" ? (
                                <>
                                    <span className="text-white/40">|</span>
                                    <Link to="/Modpack" className="hover:text-white hover:underline transition">Modpack</Link>
                                </>
                            ) : null}
                        </div>
                    </nav>

                    <div className="flex justify-end">
                        {authCtx.isLoggedIn && (
                            <button
                                onClick={() => logout()}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full transition duration-200 shadow-md"
                            >
                                Déconnexion
                            </button>
                        )}
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;
