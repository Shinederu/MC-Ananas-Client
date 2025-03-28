// TSX - Refacto avec ergonomie améliorée (grille alignée + garant intégré)

import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { MinecraftUserType, UserType } from "@/types/User";
import { useContext, useState } from "react";

type MyProfileCardProps = {
    userDetails: UserType | undefined;
    garantList: MinecraftUserType[] | undefined;
    refreshProfile: () => void;
};

const MyProfileCard = ({ userDetails, garantList, refreshProfile }: MyProfileCardProps) => {
    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [selectedGarant, setSelectedGarant] = useState<number>(0);
    const [showGarantList, setShowGarantList] = useState<boolean>(false);

    const showModal = (message: string, type: "info" | "error" | "confirm") => {
        modalCtx.setMessage(message);
        modalCtx.setType(type);
        modalCtx.setIsOpen(true);
    };

    const getAccountStatus = (): "new" | "waiting" | "exclude" | "player" => {
        if (!userDetails?.minecraft) return "new";
        if (userDetails.securityRank?.role[0] === "ROLE_USER" && userDetails.minecraft.garant) return "waiting";
        if (userDetails.securityRank?.role[0] === "ROLE_USER" && !userDetails.minecraft.garant) return "exclude";
        return "player";
    };

    const AccountStatusBanner = ({ status }: { status: ReturnType<typeof getAccountStatus> }) => {
        const config = {
            new: { color: "text-gray-300", label: "Compte non lié" },
            waiting: { color: "text-yellow-300", label: "En attente de validation" },
            exclude: { color: "text-red-400", label: "Refusé ou exclu" },
            player: { color: "text-green-300", label: "Compte validé" }
        }[status];

        return (
            <p className="text-sm sm:text-base font-medium">
                Statut : <span className={`${config.color} font-semibold`}>{config.label}</span>
            </p>
        );
    };



    const addMinecraftAccount = async () => {
        if (selectedGarant <= 0) return showModal("Merci de selectionner un garant.", "error");
        const newUsername = prompt("Entrez votre nouveau pseudo Minecraft:");
        if (!newUsername) return;

        await sendRequest({
            key: 3,
            url: import.meta.env.VITE_PLAY_API_URL + "/profil/minecraft/add",
            method: "POST",
            headers: { Authorization: authCtx.token },
            body: { pseudo: newUsername, garant_id: selectedGarant },
            onSuccess: (data) => {
                showModal(data.message, "info");
                refreshProfile();
            },
            onError: (err) => showModal(err, "error"),
        });
    };

    const refreshMinecraftAccount = async () => {
        await sendRequest({
            key: 4,
            url: import.meta.env.VITE_PLAY_API_URL + "/profil/minecraft/" + userDetails?.minecraft?.id + "/edit",
            method: "POST",
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                showModal(data.message, "confirm");
                refreshProfile();
            },
            onError: (err) => showModal(err, "error"),
        });
    };

    const deleteMinecraftAccount = async () => {
        if (!confirm("Êtes-vous sûr de vouloir délier votre compte Minecraft ?")) return;
        await sendRequest({
            key: 6,
            url: import.meta.env.VITE_PLAY_API_URL + "/profil/minecraft/" + userDetails?.minecraft?.id + "/delete",
            method: "DELETE",
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                showModal(data.message, "confirm");
                refreshProfile();
            },
            onError: (err) => showModal(err, "error"),
        });
    };

    const updateGarant = async () => {
        await sendRequest({
            key: 3,
            url: import.meta.env.VITE_PLAY_API_URL + "/profil/garant/" + userDetails?.minecraft?.id + "/update",
            method: "POST",
            headers: { Authorization: authCtx.token },
            body: { garant_id: selectedGarant },
            onSuccess: (data) => {
                showModal(data.message, "info");
                refreshProfile();
                setShowGarantList(false);
            },
            onError: (err) => showModal(err, "error"),
        });
    };

    const deleteUserAccount = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) return;
        await sendRequest({
            key: 5,
            url: import.meta.env.VITE_PLAY_API_URL + "/profil/" + userDetails?.id + "/delete",
            method: "DELETE",
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                showModal(data.message, "confirm");
                location.reload();
            },
            onError: (err) => showModal(err, "error"),
        });
    };

    const status = getAccountStatus();
    const isUser = userDetails?.securityRank?.role[0] === "ROLE_USER";
    const hasGarant = userDetails?.minecraft?.garant != null;

    return (
        <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <AccountStatusBanner status={status} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-3/5 mx-auto">
                <InfoRow label="Discord Username" value={userDetails?.username} />
                <InfoRow label="Discord ID" value={userDetails?.discordId} />
                <InfoRow label="Minecraft Account" value={userDetails?.minecraft?.pseudo} />
                <InfoRow label="Minecraft UUID" value={userDetails?.minecraft?.uuid} />

                {status === "new" && (
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium block mb-1">Sélectionner un garant</label>
                        <select
                            value={selectedGarant}
                            onChange={(e) => setSelectedGarant(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        >
                            <option value="">-- Sélectionner un garant --</option>
                            {garantList?.map((g) => (
                                <option key={g.id} value={g.id}>{g.pseudo}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-100 mt-1">Un garant est requis pour lier votre compte Minecraft.</p>
                    </div>
                )}

                {userDetails?.minecraft && (
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium block mb-1">Garant actuel</label>
                        {isUser && !hasGarant ? (
                            <>
                                <div className="flex gap-3">
                                    <select
                                        value={selectedGarant}
                                        onChange={(e) => setSelectedGarant(Number(e.target.value))}
                                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                                    >
                                        <option value="">-- Sélectionner un garant --</option>
                                        {garantList?.map((g) => (
                                            <option key={g.id} value={g.id}>{g.pseudo}</option>
                                        ))}
                                    </select>
                                    <button onClick={updateGarant} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Enregistrer</button>
                                </div>
                            </>
                        ) : showGarantList ? (
                            <div className="flex gap-3">
                                <select
                                    value={selectedGarant}
                                    onChange={(e) => setSelectedGarant(Number(e.target.value))}
                                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                                >
                                    <option value="">-- Sélectionner un garant --</option>
                                    {garantList?.map((g) => (
                                        <option key={g.id} value={g.id}>{g.pseudo}</option>
                                    ))}
                                </select>
                                <button onClick={updateGarant} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Enregistrer</button>
                                <button onClick={() => setShowGarantList(false)} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">Annuler</button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={userDetails.minecraft?.garant?.pseudo ?? "-"}
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900"
                                />
                                <button onClick={() => setShowGarantList(true)} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Modifier</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-4 justify-center flex-wrap w-full sm:w-3/5 mx-auto">
                {userDetails?.minecraft ? (
                    <>
                        <button onClick={refreshMinecraftAccount} className="min-w-[150px] px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            Actualiser Minecraft
                        </button>
                        <button onClick={deleteMinecraftAccount} className="min-w-[150px] px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                            Supprimer Minecraft
                        </button>
                    </>
                ) : (
                    <button onClick={addMinecraftAccount} className="min-w-[150px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Lier Minecraft
                    </button>
                )}
                <button onClick={deleteUserAccount} className="min-w-[150px] px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Supprimer mon compte
                </button>
            </div>

            {status === "new" && (
                <div className="w-full sm:w-3/5 mx-auto">
                    <div className="bg-slate-800 m-2 border-gray-600 border-2 p-4 text-sm">
                        <h1 className="font-semibold text-xl mb-2">Comment ça marche ?</h1>
                        <p>
                            En liant votre compte Minecraft, vous devez sélectionner un joueur déjà accepté
                            comme garant. Cette personne atteste que vous êtes digne de confiance et que
                            vous ne venez pas pour tout casser 😅.<br /><br />
                            Une fois la demande faite, vous devrez attendre que ce garant accepte votre requête.
                            Dès qu’il le fait, vous aurez accès aux infos et au serveur !
                        </p>
                    </div>
                </div>
            )}

            {status === "waiting" && (
                <div className="w-full sm:w-3/5 mx-auto">
                    <div className="bg-yellow-900 m-2 border-yellow-600 border-2 p-4 text-sm">
                        <h1 className="font-semibold text-xl mb-2">En attente</h1>
                        <p>
                            Votre garant doit encore examiner votre requête. Une fois qu’il vous aura accepté,
                            vous aurez accès à toutes les fonctionnalités du serveur.
                        </p>
                    </div>
                </div>
            )}

            {status === "exclude" && (
                <div className="w-full sm:w-3/5 mx-auto">
                    <div className="bg-red-900 m-2 border-red-600 border-2 p-4 text-sm">
                        <h1 className="font-semibold text-xl mb-2">Refusé ou exclu</h1>
                        <p>
                            Votre demande de garant a été refusée, ou votre garant vous a retiré de sa liste de confiance.
                            Vous n’avez plus accès aux ressources du serveur.
                        </p>
                    </div>
                </div>
            )}

            {status === "player" && !showGarantList && (
                <div className="w-full sm:w-3/5 mx-auto">
                    <div className="bg-slate-800 m-2 border-yellow-400 border-2 p-4 text-sm">
                        <p>
                            Si vous supprimez votre compte Minecraft ou le compte du site, les joueurs
                            dont vous êtes le garant perdront également l’accès au serveur.
                        </p>
                    </div>
                </div>
            )}

            {status === "player" && showGarantList && (
                <div className="w-full sm:w-3/5 mx-auto">
                    <div className="bg-red-900 m-2 border-red-600 border-2 p-4 text-sm">
                        <p>
                            ⚠️ Attention : si vous modifiez votre garant, vous devrez à nouveau attendre
                            son approbation pour accéder au serveur. De plus, vos enfants perdront également l'accès.
                        </p>
                    </div>
                </div>
            )}


        </div>
    );
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">{label}</label>
        <div className="bg-white text-gray-900 text-sm px-3 py-2 rounded-md text-center w-full">
            {value ?? "-"}
        </div>
    </div>
);

export default MyProfileCard;
