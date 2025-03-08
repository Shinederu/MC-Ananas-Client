import Title from "@/components/decoration/Title";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ServerInfoType } from "@/types/Server";
import { useContext, useEffect, useState } from "react";



const Server = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const [serverInfo, setServerInfo] = useState<ServerInfoType>({
        online: false,
        motd: ["", ""],
        players: [0, 0],
        version: "Inconnue",
        icon: ""
    });

    useEffect(() => {
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
                                motd: [data.motd.html[0], data.motd.html[1]],
                                players: [data.players.online, data.players.max],
                                version: data.version,
                                icon: data.icon
                            });
                        } else {
                            console.log("Aucune connexion au serveur");
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
        checkServer();
    }, []);


    return (
        <div className="min-h-[80vh] grid grid-cols-4 gap-4">
            {/* Gauche */}
            <div className="flex flex-col gap-4">
                <div className="bg-red-300 p-4 flex-1">
                    <Title size={2} title="Le Serveur" />
                    <p>État: {serverInfo?.online ? "En ligne" : "Hors-ligne"}</p>
                    <p>Version: {serverInfo?.version}</p>
                    <p>Joueurs en ligne: {serverInfo?.players[0]}/{serverInfo?.players[1]}</p>
                    <img className="w-16 " src={serverInfo.icon} alt="" />
                    <p className="mt-2">{serverInfo.motd[0]} <br /> {serverInfo.motd[1]}</p>
                    <p className="font-bold">play.shinederu.lol</p>
                </div>
                <div className="bg-blue-300 p-4 flex-1">
                    <Title size={2} title="Le Modpack" />
                    <p>Download Link</p>
                    <p>Last Update: ???</p>
                </div>
            </div>

            {/* Droite */}
            <div className="col-span-3">
                <div className="bg-gray-300 p-4 h-full">
                    <iframe
                        src="https://bluemap.play.shinederu.lol"
                        className="w-full h-full"
                        title="BlueMap"
                    />
                </div>
            </div>
        </div>
    );
};

export default Server;
