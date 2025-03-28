import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ModpackType } from "@/types/Modspack";
import { FolderArchive } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ModspackInfosCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const [modpack, setModpack] = useState<ModpackType>();
    const [mcVersionList, setMcVersionList] = useState<string[]>([]);

    const sendGetModpackInfo = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/modpack',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setModpack(data.modpack)
            },
            onError: (error) => {
                modalCtx.setMessage(error);
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });
    };

    const sendGetMinecraftVersionList = async () => {
        await sendRequest({
            key: 4,
            url: 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json',
            method: 'GET',
            credentials: false,
            onSuccess: (data) => {
                setMcVersionList(data.versions
                    .filter((v: any) => v.type === "release")
                    .map((v: any) => v.id));
            },
            onError: (error) => {
                modalCtx.setMessage(error);
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });
    };

    useEffect(() => {
        sendGetMinecraftVersionList();
        sendGetModpackInfo();
    }, []);


    const handleChange = (key: keyof ModpackType, value: string | number) => {
        setModpack((prev) =>
            prev ? { ...prev, [key]: value } : undefined
        );
    };

    const onSave = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/modpack/' + modpack?.id + '/edit',
            method: 'POST',
            headers: { Authorization: authCtx.token },
            body: {
                id: modpack?.id,
                name: modpack?.name,
                version: modpack?.version,
                modLoader: modpack?.modLoader,
                link: modpack?.link,
                createdAt: modpack?.createdAt,
                updatedAt: modpack?.updatedAt
            },
            onSuccess: (data) => {
                modalCtx.setMessage(data.message);
                modalCtx.setType("confirm");
                modalCtx.setIsOpen(true);
            },
            onError: (error) => {
                modalCtx.setMessage(error);
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });
    }

    return (
        <div className="h-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
            <h1 className="text-3xl font-bold mb-6">Modpack</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Nom du modpack"
                    value={modpack?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <select
                    value={modpack?.version}
                    onChange={(e) => handleChange("version", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                >
                    <option value="">Sélectionne une version Minecraft</option>
                    {mcVersionList.map((version) => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Mod Loader (ex: Forge, Fabric)"
                    value={modpack?.modLoader}
                    onChange={(e) => handleChange("modLoader", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <input
                    type="url"
                    placeholder="Lien de téléchargement"
                    value={modpack?.link}
                    onChange={(e) => handleChange("link", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <button
                    onClick={() => onSave()}
                    className="bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:bg-gray-200"
                >
                    Enregistrer le modpack
                    <FolderArchive className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ModspackInfosCard;
