import MinecraftSkinCard from "@/components/cards/MInecraftSkinCard";
import { useState } from "react";

const Profile = () => {
    const [discordId] = useState("123456789");
    const [discordUsername] = useState("User#0001");
    const [minecraftUsername, setMinecraftUsername] = useState("Steve");

    const handleUpdateMinecraft = () => {
        const newUsername = prompt("Entrez votre nouveau pseudo Minecraft:", minecraftUsername);
        if (newUsername) {
            setMinecraftUsername(newUsername);
        }
    };

    const handleDeleteAccount = () => {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
        if (confirmDelete) {
            alert("Compte supprimé");
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {/* Section Skin Minecraft */}
                <div>
                    <MinecraftSkinCard username={minecraftUsername} />
                </div>

                {/* Section Infos */}
                <div className="col-span-2">
                    <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white flex flex-col gap-3">
                        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
                        <div>
                            <label className="block text-gray-100">Discord ID</label>
                            <input

                                type="text"
                                value={discordId}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100 text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Discord Username</label>
                            <input
                                type="text"
                                value={discordUsername}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Minecraft Account</label>
                            <input
                                type="text"
                                value={minecraftUsername}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>

                        <div className="mt-6 mb-4 flex gap-4 justify-center">
                            <button
                                onClick={handleUpdateMinecraft}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Modifier Minecraft
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Supprimer mon compte
                            </button>
                        </div>
                        <p className="bg-slate-800 m-2 border-yellow-400 border-2 font-semibold p-2">Un nom d'utilisateur Minecraft doit être obligatoirement renseigné afin d'accéder au site complet.</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;