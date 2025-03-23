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
            minecraft_id: 0,
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
                    
                    minecraft_id: data.user.minecraft?.id ?? 0,
                    minecraft_username: data.user.minecraft?.pseudo ?? '',
                    minecraft_uuid: data.user.minecraft?.uuid ?? '',
                    garant: data.user.minecraft?.garant?.pseudo ?? '',
                    role: data.user.securityRank.rolename,
                });
            },
            onError: (error) => {
                modalCtx.setMessage(error);
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


    const sendMinecraftRefresh = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/' + userDetails.minecraft_id + '/edit',
            method: 'POST',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                modalCtx.setMessage(data.message);
                modalCtx.setType("confirm");
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


    const handleMinecraftDelete = () => {
        const choice = confirm("Êtes-vous sûr de vouloir Dé-lier votre compte minecraft ? Vous et les personnes dont vous êtes le garant perdrez l'accès au serveur...");
        if (choice) {
            const sendMinecraftDelete = async () => {
                await sendRequest({
                    key: 6,
                    url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/' + userDetails.minecraft_id + '/delete',
                    method: 'DELETE',
                    headers: { Authorization: authCtx.token },
                    onSuccess: (data) => {
                        modalCtx.setMessage(data.message);
                        modalCtx.setType("confirm");
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
            sendMinecraftDelete();
        }
    };

    const handleDeleteAccount = () => {
        const choice = confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
        if (choice) {
            const sendDeleteAccount = async () => {
                await sendRequest({
                    key: 5,
                    url: import.meta.env.VITE_PLAY_API_URL + '/profil/' + userDetails.id + '/delete',
                    method: 'DELETE',
                    headers: { Authorization: authCtx.token },
                    onSuccess: (data) => {
                        modalCtx.setMessage(data.message);
                        modalCtx.setType("confirm");
                        modalCtx.setIsOpen(true);
                        location.reload();
                    },
                    onError: (error) => {
                        modalCtx.setMessage(error);
                        modalCtx.setType("error");
                        modalCtx.setIsOpen(true);
                    },
                });
            };
            sendDeleteAccount();
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
                        <div>
                            <label className="block text-gray-100">Minecraft UUID</label>
                            <input
                                type="text"
                                value={userDetails.minecraft_uuid}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>

                        <div className="mt-6 mb-4 flex gap-4 justify-center">

                            {userDetails.minecraft_username ?
                                <>
                                    <button
                                        onClick={sendMinecraftRefresh}
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
                                </>
                                :
                                <>
                                    <button
                                        onClick={handleMinecraftAdd}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Ajouter lier mon compte Minecraft
                                    </button>
                                </>
                            }
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