import MinecraftSkinCard from "@/components/cards/MInecraftSkinCard";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { UserType } from "@/types/User";
import { useContext, useEffect, useState } from "react";

const Profile = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState<UserType>(
        {
            id: 0,
            discord_avatar: '',
            discord_username: '',
            discord_id: '',
            role: '',
            minecraft_username: '',
            minecraft_uuid: '',
            garant: null,
        }
    )
    const sendGetProfile = async () => {
        await sendRequest({
            key: 3,
            url: import.meta.env.VITE_PLAY_API_URL + '/profil',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setUserDetails({
                    id: data.user.id,
                    discord_username: data.user.username,
                    discord_id: data.user.discordId,
                    discord_avatar: data.user.discord_avatar,

                    minecraft_username: data.user.minecraft?.pseudo ?? '',
                    minecraft_uuid: data.user.minecraft?.uuid ?? '',
                    garant: data.user.minecraft.garant?.pseudo ?? '',
                    role: data.user.securityRank.rolename,
                });
            },
            onError: (error) => {
                modalCtx.setMessage("Impossible de récupéré les données " + error);
                modalCtx.setType("error");
                modalCtx.setIsOpen(true);
            },
        });
    };

    useEffect(() => {
        sendGetProfile();
    }, []);

    const handleMinecraftAdd = () => {
        const newUsername = prompt("Entrez votre nouveau pseudo Minecraft:", userDetails.minecraft_username);
        if (newUsername) {
            const sendMinecraftAdd = async () => {
                await sendRequest({
                    key: 3,
                    url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/add',
                    method: 'POST',
                    headers: { Authorization: authCtx.token },
                    body: { pseudo: newUsername, garant_id: 1 },
                    onSuccess: (data) => {
                        modalCtx.setMessage(data.message);
                        modalCtx.setType("info");
                        modalCtx.setIsOpen(true);
                        sendGetProfile();
                    },
                    onError: (error) => {
                        modalCtx.setMessage(error);
                        modalCtx.setType("error");
                        modalCtx.setIsOpen(true);
                    },
                });
            };
            sendMinecraftAdd();
        }
    };

    const handleMinecraftRefresh = () => {
        const newUsername = prompt("Entrez votre nouveau pseudo Minecraft:", userDetails.minecraft_username);
        if (newUsername) {

        }
    };

    const handleMinecraftDelete = () => {
        const newUsername = prompt("Êtes-vous sûr de vouloir supprimer votre compte minecraft ?", userDetails.minecraft_username);
        if (newUsername) {

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
                    <MinecraftSkinCard username={userDetails.minecraft_username} />
                </div>

                {/* Section Infos */}
                <div className="col-span-2">
                    <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white flex flex-col gap-3">
                        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
                        <div>
                            <label className="block text-gray-100">Discord ID</label>
                            <input

                                type="text"
                                value={userDetails.discord_id}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100 text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Discord Username</label>
                            <input
                                type="text"
                                value={userDetails.discord_username}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Minecraft Account</label>
                            <input
                                type="text"
                                value={userDetails.minecraft_username}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>

                        <div className="mt-6 mb-4 flex gap-4 justify-center">
                            <button
                                onClick={handleMinecraftAdd}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Ajouter lier mon compte Minecraft
                            </button>
                            <button
                                onClick={handleMinecraftRefresh}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Actualisé mon compte Minecraft
                            </button>
                            <button
                                onClick={handleMinecraftDelete}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                            >
                                Supprimer mon compte Minecraft
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                Supprimer mon compte (du site)
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