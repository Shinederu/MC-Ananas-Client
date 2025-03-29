import { Link } from "react-router-dom";
import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";

const Header = () => {

    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const navItems = [
        {
            label: "Serveur",
            to: "/Server",
            roles: ["ROLE_MINECRAFT", "ROLE_FRIEND", "ROLE_ADMIN"],
        },
        {
            label: "Utilisateurs",
            to: "/Users",
            roles: ["ROLE_MINECRAFT", "ROLE_FRIEND", "ROLE_ADMIN"],
        },
        {
            label: "Bluemap",
            href: "https://bluemap.play.shinederu.lol",
            roles: ["ROLE_MINECRAFT", "ROLE_FRIEND", "ROLE_ADMIN"],
        },
        {
            label: "Profil",
            to: "/Profile",
            roles: ["ROLE_USER", "ROLE_MINECRAFT", "ROLE_FRIEND", "ROLE_ADMIN"],
        },
        {
            label: "Administration",
            to: "/Management",
            roles: ["ROLE_ADMIN"],
        },
    ];

    const sendLogout = async () => {
        await sendRequest({
            key: 71,
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
            onError: (error) => {
                modalCtx.open("Impossible de contacter le serveur... Réessayer plus tard !", "error", error);
            },
        });

    };

    return (
        <>
            <header className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50 text-white">
                <div className="flex flex-col items-center py-4">
                    <h1 className="tracking-wider text-3xl font-bold drop-shadow" >ShinedePlay</h1>
                </div>
                <div className="grid grid-cols-3 items-center w-full px-6 pb-2 ">
                    <div>
                        {authCtx.username ? <p>Bonjour {authCtx.username}</p> : <p>Connectez-vous pour accéder aux ressources !</p>}
                    </div>
                    <nav className="justify-self-center">
                        <div className="flex gap-6  font-medium items-center">
                            {navItems
                                .filter(item => item.roles.includes(authCtx.role))
                                .map((item, idx, arr) => (
                                    <>
                                        <div>
                                            {item.to ? (
                                                <Link to={item.to} className="hover:text-white hover:underline transition">
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <a href={item.href} className="hover:text-white hover:underline transition">
                                                    {item.label}
                                                </a>
                                            )}
                                        </div>
                                        {idx < arr.length - 1 && <span className="text-white/40">|</span>}
                                    </>
                                ))}
                        </div>
                    </nav>
                    <div className="flex justify-end">
                        {authCtx.isLoggedIn && (
                            <button
                                onClick={() => sendLogout()}
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
