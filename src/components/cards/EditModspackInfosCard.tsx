import { ModpackType } from "@/types/Modspack";
import { FolderArchive } from "lucide-react";
import { useState } from "react";

const ModspackInfosCard = () => {


    const [modpack, setModpack] = useState<ModpackType>({
        nom: "",
        date: "",
        minecraftVersion: "",
        modLoader: "",
        modsCount: 0,
        downloadLink: "",
    });
    const handleChange = (key: keyof ModpackType, value: string | number) => {
        setModpack((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onSave = (modpack:ModpackType) => {
        alert("Pas encore mis en place : " + modpack.nom);
    }

    return (
        <div className="h-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
            <h1 className="text-3xl font-bold mb-6">Modpack</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Nom du modpack"
                    value={modpack.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <input
                    type="text"
                    placeholder="Version Minecraft (ex: 1.20.1)"
                    value={modpack.minecraftVersion}
                    onChange={(e) => handleChange("minecraftVersion", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <input
                    type="text"
                    placeholder="Mod Loader (ex: Forge, Fabric)"
                    value={modpack.modLoader}
                    onChange={(e) => handleChange("modLoader", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <input
                    type="number"
                    placeholder="Nombre de mods"
                    value={modpack.modsCount}
                    onChange={(e) => handleChange("modsCount", Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <input
                    type="url"
                    placeholder="Lien de téléchargement"
                    value={modpack.downloadLink}
                    onChange={(e) => handleChange("downloadLink", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-black"
                />

                <button
                    onClick={() => onSave(modpack)}
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
