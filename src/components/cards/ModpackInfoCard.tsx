import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ModpackType } from "@/types/Modpack";
import { DateTimeFormatter } from "@/utils/DateTimeFormatter";
import { FolderArchive } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ModpackInfoCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [modpack, setModspack] = useState<ModpackType>();



    const sendGetModpackInfo = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/modpack',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setModspack(data.modpack)
            },
            onError: (error) => {
                modalCtx.setMessage(error);
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });
    };

    useEffect(() => {
        sendGetModpackInfo();
    }, []);


    const openToDownload = () => {
        window.open(modpack?.link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-red-400 to-purple-500 rounded-2xl shadow-lg text-white space-y-6">
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    {modpack?.name}
                </h1>
            </div>

            <div className="bg-white/10 rounded-xl px-4 py-3 w-full text-center space-y-2 text-base sm:text-lg">
                {modpack?.updatedAt ? (
                    <p>
                        Mise à jour le <span className="font-medium">{DateTimeFormatter(modpack?.updatedAt)}</span>
                    </p>
                ) : (
                    <p>
                        Créé le <span className="font-medium">{DateTimeFormatter(modpack?.createdAt ?? '')}</span>
                    </p>
                )}
                <p>
                    Version Minecraft : <span className="font-medium">{modpack?.version}</span>
                </p>
                <p>
                    Mod Loader : <span className="font-medium">{modpack?.modLoader}</span>
                </p>
            </div>

            <div>
                <button
                    onClick={openToDownload}
                    className="w-full bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-200"
                >
                    Télécharger le modpack
                    <FolderArchive className="w-5 h-5" />
                </button>
            </div>
        </div>
    );


}

export default ModpackInfoCard;
