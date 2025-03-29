import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { ModpackType } from "@/types/Modpack";
import { FolderArchive } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ModpackInfosCard = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [modpack, setModpack] = useState<ModpackType>();
    const [mcVersionList, setMcVersionList] = useState<string[]>([]);

    const sendGetModpackInfo = async () => {
        await sendRequest({
            key: 21,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/modpack',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setModpack(data.modpack)
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    const sendGetMinecraftVersionsList = async () => {
        await sendRequest({
            key: 22,
            url: 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json',
            method: 'GET',
            credentials: false,
            onSuccess: (data) => {
                setMcVersionList(data.versions
                    .filter((v: any) => v.type === "release")
                    .map((v: any) => v.id));
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    const sendSaveChanges = async () => {
        await sendRequest({
            key: 23,
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
                modalCtx.open(data.message, "result");
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    }

    useEffect(() => {
        sendGetMinecraftVersionsList();
        sendGetModpackInfo();
    }, []);

    const handleChange = (key: keyof ModpackType, value: string | number) => {
        setModpack((prev) =>
            prev ? { ...prev, [key]: value } : undefined
        );
    };

    return (
        <div className="h-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
            <h1 className="text-3xl font-bold mb-6">Gestion des infos Modpack</h1>

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-semibold">Nom du modpack</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nom du modpack"
                        value={modpack?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-black"
                    />
                </div>
                <div>
                    <label htmlFor="version" className="block mb-1 font-semibold">Version Minecraft</label>
                    <select
                        id="version"
                        value={modpack?.version}
                        onChange={(e) => handleChange("version", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-black"
                    >
                        <option value="" disabled={true}>Sélectionne une version Minecraft</option>
                        {mcVersionList.map((version) => (
                            <option key={version} value={version}>
                                {version}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="modLoader" className="block mb-1 font-semibold">Mod Loader</label>
                    <input
                        id="modLoader"
                        type="text"
                        placeholder="Mod Loader (ex: Forge, Fabric)"
                        value={modpack?.modLoader}
                        onChange={(e) => handleChange("modLoader", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-black"
                    />
                </div>
                <div>
                    <label htmlFor="link" className="block mb-1 font-semibold">Lien de téléchargement</label>
                    <input
                        id="link"
                        type="url"
                        placeholder="Lien de téléchargement"
                        value={modpack?.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-black"
                    />
                </div>
                <button
                    onClick={() => sendSaveChanges()}
                    className="bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:bg-gray-200"
                >
                    Enregistrer le modpack
                    <FolderArchive className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ModpackInfosCard;
