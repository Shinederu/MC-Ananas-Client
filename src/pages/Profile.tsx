import MinecraftSkinCard from "@/components/cards/MInecraftSkinCard";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { MinecraftUserType, UserType } from "@/types/User";
import { useContext, useEffect, useState } from "react";

const Profile = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);



    const [userDetails, setUserDetails] = useState<UserType>(
        {
            id: 0,
            username: '',
            discordId: '',
            avatar: '',
            minecraft: null,
            securityRank: null,

        }
    )
    const [listGarants, setListGarants] = useState<MinecraftUserType[]>();
    const [selectedGarant, setSelectedGarant] = useState<number>(0);


    const sendGetProfile = async () => {
        await sendRequest({
            key: 3,
            url: import.meta.env.VITE_PLAY_API_URL + '/profil',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setUserDetails({
                    id: data[0].user.id,
                    username: data[0].user.username,
                    discordId: data[0].user.discordId,
                    avatar: data[0].user.avatar,
                    minecraft: data[0].user.minecraft,
                    securityRank: data[0].user.securityRank
                });
                setListGarants(data[1].usersVerified?.map((entry: any) => entry.minecraft));
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
        if (selectedGarant > 0) {
            const newUsername = prompt("Entrez votre nouveau pseudo Minecraft:");
            if (newUsername) {
                const sendMinecraftAdd = async () => {
                    await sendRequest({
                        key: 3,
                        url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/add',
                        method: 'POST',
                        headers: { Authorization: authCtx.token },
                        body: { pseudo: newUsername, garant_id: selectedGarant },
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
        } else {
            modalCtx.setMessage("Merci de selectionner la personne qui se portera garant pour vous");
            modalCtx.setType("error");
            modalCtx.setIsOpen(true);
        }
    };


    const sendMinecraftRefresh = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/' + userDetails.minecraft?.id + '/edit',
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
                    url: import.meta.env.VITE_PLAY_API_URL + '/profil/minecraft/' + userDetails.minecraft?.id + '/delete',
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
                    <MinecraftSkinCard username={userDetails.minecraft?.pseudo + ""} />
                </div>

                {/* Section Infos */}
                <div className="col-span-2">
                    <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white flex flex-col gap-3">
                        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
                        <div>
                            <label className="block text-gray-100">Discord ID</label>
                            <input

                                type="text"
                                value={userDetails.discordId}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100 text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Discord Username</label>
                            <input
                                type="text"
                                value={userDetails.username}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Minecraft Account</label>
                            <input
                                type="text"
                                value={userDetails.minecraft?.pseudo}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100">Minecraft UUID</label>
                            <input
                                type="text"
                                value={userDetails.minecraft?.uuid}
                                disabled
                                className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                            />
                        </div>
                        {userDetails.minecraft ?
                            <>

                                <div>
                                    <label className="block text-gray-100">Votre garant</label>
                                    <input
                                        type="text"
                                        value={userDetails.minecraft?.garant?.pseudo}
                                        disabled
                                        className="w-3/5 px-3 py-2 border rounded-md bg-gray-100  text-gray-900 text-center"
                                    />
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    <label className="block text-gray-100">Garants disponibles</label>
                                    <select
                                        value={selectedGarant}
                                        onChange={(e) => setSelectedGarant(Number(e.target.value))}
                                        className="w-3/5 px-3 py-2 border rounded-md bg-gray-100 text-gray-900 text-center"
                                    >
                                        <option value="">-- Sélectionner un garant --</option>
                                        {listGarants?.map((usersVerified) => (
                                            <option key={usersVerified.id} value={usersVerified.id}>{usersVerified.pseudo}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        }


                        <div className="mt-6 mb-4 flex gap-4 justify-center">

                            {userDetails.minecraft ?
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
                        {userDetails.minecraft ?
                            <>
                                {userDetails.securityRank?.role[0] == "ROLE_USER" ?
                                    <>
                                        <p className="bg-slate-800 m-2 border-yellow-400 border-2 font-semibold p-2">Votre compte est en attente de l'aprobation de votre garant. Repassez plus tard !</p>
                                    </>
                                    :
                                    <>
                                        <p className="bg-slate-800 m-2 border-yellow-400 border-2 font-semibold p-2">Si vous supprimez votre compte, ou déliez votre compte Minecraft, les personnes dont vous êtes le garant perdrons également l'accès au serveur.</p>
                                    </>
                                }
                            </>
                            :
                            <div className="bg-slate-800 m-2 border-red-900 border-2 p-2">
                                <h1 className="font-semibold text-2xl">Principe</h1>
                                <p className="text-left">
                                    Pour accéder au reste du site, ainsi qu'au serveur Minecraft, vous devez:<br />
                                    - Réaliser une demande d'accès auprès de quelqu'un qui se portera garant de votre bienveillance pour le serveur. <br />
                                    - Attendre que le garant selectionné valide votre inscription. <br />
                                    - Découvrir le site et accéder au serveur !
                                </p>
                            </div>
                        }


                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;