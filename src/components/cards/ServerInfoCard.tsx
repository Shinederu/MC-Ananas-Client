import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ServerInfoType } from "@/types/Server";
import { useContext, useState } from "react";
import { Copy } from "lucide-react";
import { useInterval } from "@/shared/hooks/useInterval";

const ServerInfoCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);

    const [serverInfo, setServerInfo] = useState<ServerInfoType>({
        online: false,
        motd: ["", ""],
        players: [0, 0],
        version: "Inconnue",
        icon: ""
    });
    const [copied, setCopied] = useState(false);

    const sendCheckServer = async () => {
        await sendRequest({
            key: 61,
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
            onError: (error) => {
                modalCtx.open("Impossible de contacter l'API... Réessayer plus tard !", "error", error);
            },
        });
    };

    useInterval(() => {
        sendCheckServer();
    }, 15000);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("play.shinederu.lol");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">All The Ananas</h1>
            {serverInfo.icon && (
                <img
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white object-cover"
                    src={serverInfo.icon}
                    alt="Server Icon"
                />
            )}
            <div className="bg-white/10 rounded-xl px-4 py-3 w-full text-center space-y-1 text-base sm:text-lg">
                <p>
                    État:{" "}
                    <span className={serverInfo.online ? "text-green-300" : "text-red-300"}>
                        {serverInfo.online ? "En ligne ✅" : "Hors-ligne ❌"}
                    </span>
                </p>
                <p>Version: <span className="font-medium">{serverInfo.version}</span></p>
                <p>Joueurs: <span className="font-medium">{serverInfo.players[0]}/{serverInfo.players[1]}</span></p>
            </div>
            <p className="text-center opacity-80 text-sm sm:text-base">
                {serverInfo.motd[0]}<br />
                {serverInfo.motd[1]}
            </p>
            <button
                onClick={copyToClipboard}
                className="mt-2 bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-gray-200"
            >
                {copied ? (
                    <span className="flex items-center gap-2">Copié ! ✅</span>
                ) : (
                    <>
                        play.shinederu.lol <Copy className="w-5 h-5" />
                    </>
                )}
            </button>
        </div>
    );
}

export default ServerInfoCard;
