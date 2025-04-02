import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useInterval } from "@/shared/hooks/useInterval";
import { ServerInfoType } from "@/types/Server";
import { useContext, useState } from "react";

const MinecraftServerControlsCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [serverInfo, setServerInfo] = useState<ServerInfoType>({
        online: false,
        motd: ["", ""],
        players: [0, 0],
        version: "Inconnue",
        icon: ""
    });

    const sendCheckServer = async () => {
        await sendRequest({
            key: 31,
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

    const sendMinecraftCommand = async (commandtoSend: string) => {
        await sendRequest({
            key: 32,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/minecraft/server/send-command',
            method: 'POST',
            headers: { Authorization: authCtx.token },
            body: { command: commandtoSend },
            onSuccess: (data) => {
                modalCtx.open(data.message, "result", data.response.replace(/\u0000/g, '').replace(/§[0-9a-fklmnor]/gi, '').replace(/\x1B\[[0-9;]*m/g, '').trim());
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    }

    const sendServerSync = async () => {
        await sendRequest({
            key: 33,
            url: import.meta.env.VITE_PLAY_API_URL + '/server/server-off',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                modalCtx.open(data.message, "result");
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    }

    useInterval(() => {
        sendCheckServer();
    }, 5000);

    const handleSendMinecraftCommand = async () => {
        const command = await modalCtx.open("Entrer la commande a exécuter: ", "prompt");
        if (!command) return;
        sendMinecraftCommand(command);
    }

    return (
        <div className="bg-gradient-to-br from-purple-800 to-black p-6 rounded-2xl shadow-lg text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Contrôles du serveur Minecraft</h1>
            <div className="mb-4">
                <p className="text-2xl font-semibold">
                    État :
                    <span className={`ml-2 font-bold ${serverInfo.online ? "text-green-300" : "text-red-300"}`}>
                        {serverInfo.online ? "En ligne ✅" : "Hors-ligne ❌"}
                    </span>
                </p>
            </div>
            {serverInfo.online && (
                <div className="grid grid-cols-2 gap-4">
                    <p className="col-span-2 text-xl font-bold text-center">Administration</p>
                    <button onClick={() => sendMinecraftCommand("stop")} className="border p-2 rounded-md font-bold bg-red-800 hover:scale-105 transition-transform">
                        Redémarer le serveur
                    </button>
                    <button onClick={() => handleSendMinecraftCommand()} className="border p-2 rounded-md font-bold bg-gray-600 hover:scale-105 transition-transform">
                        Envoyer une commande
                    </button>
                    <p className="col-span-2 text-xl font-bold text-center">Gestion Whitelist </p>
                    <button onClick={() => sendMinecraftCommand("whitelist on")} className="border p-2 rounded-md font-bold bg-red-600 hover:scale-105 transition-transform">
                        Activer
                    </button>
                    <button onClick={() => sendMinecraftCommand("whitelist off")} className="border p-2 rounded-md font-bold bg-green-600 hover:scale-105 transition-transform">
                        Désactiver
                    </button>
                    <button onClick={() => sendServerSync()} className=" col-span-2 border p-2 rounded-md font-bold bg-blue-600 hover:scale-105 transition-transform">
                        Synchroniser
                    </button>
                </div >
            )}
        </div >
    );
}

export default MinecraftServerControlsCard;