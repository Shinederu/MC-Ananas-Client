import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ServerInfoType } from "@/types/Server";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Copy } from "lucide-react";

const ServerInfoCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const loc = useLocation();
    const [serverInfo, setServerInfo] = useState<ServerInfoType>({
        online: false,
        motd: ["", ""],
        players: [0, 0],
        version: "Inconnue",
        icon: ""
    });
    const [copied, setCopied] = useState(false); // État pour afficher la confirmation

    const checkServer = async () => {
        try {
            await sendRequest({
                key: 3,
                url: 'https://api.mcsrvstat.us/3/play.shinederu.lol',
                method: 'GET',
                credentials: false,
                onSuccess: (data) => {
                    if (data.debug.ping) {
                        setServerInfo({
                            online: data.debug.ping,
                            motd: [data.motd.clean[0], data.motd.clean[1]],
                            players: [data.players.online, data.players.max],
                            version: data.version,
                            icon: data.icon
                        });
                    }
                },
                onError: () => {
                    modalCtx.setMessage("Impossible de contacter l'API... Réessayer plus tard !");
                    modalCtx.setType("error");
                    modalCtx.setIsOpen(true);
                },
            });
        } catch (error) {
            console.error("Erreur lors de la requête à l'API :", error);
        }
    };

    useEffect(() => {
        checkServer();
        let intervalId: number | undefined;

        if (loc.pathname === '/') {
            intervalId = window.setInterval(checkServer, 15000);
        }
        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("play.shinederu.lol");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
    };

    return (
        <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white ">
            <h1 className="text-3xl font-bold">CobbleAnanas</h1>
            <div className="mt-4 flex justify-center">
                {serverInfo.icon && (
                    <img className="w-16 h-16 rounded-full border-2 border-white" src={serverInfo.icon} alt="Server Icon" />
                )}
            </div>

            <p className="text-lg font-semibold mt-3">
                État: <span className={serverInfo.online ? "text-green-300" : "text-red-300"}>
                    {serverInfo.online ? "En ligne ✅" : "Hors-ligne ❌"}
                </span>
            </p>

            <p className="text-md">Version: <span className="font-medium">{serverInfo.version}</span></p>
            <p className="text-md">Joueurs: <span className="font-medium">{serverInfo.players[0]}/{serverInfo.players[1]}</span></p>

            <p className="mt-3 opacity-80">
                {serverInfo.motd[0]}
                <br />
                {serverInfo.motd[1]}</p>

            <button
                onClick={copyToClipboard}
                className="mt-4 bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:bg-gray-200"
            >
                {copied ? "Copié !" : "play.shinederu.lol"}
                <Copy className="w-5 h-5" />
            </button>
        </div>
    );
}

export default ServerInfoCard;
