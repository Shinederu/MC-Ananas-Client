import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { MinecraftUserType } from "@/types/User";
import { useContext } from "react";

type AuthorizedUsersListProps = {
    userList: MinecraftUserType[];
    refreshList: () => void;
}
const AuthorizedUsersList = (props: AuthorizedUsersListProps) => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const sendMinecraftBan = async (minecraftUser: MinecraftUserType) => {
        const confirmBan = await modalCtx.open("Pourquoi vouloir bannir " + minecraftUser.pseudo + " ?", "prompt");
        if (confirmBan) {
            await sendRequest({
                key: 81,
                url: import.meta.env.VITE_PLAY_API_URL + '/users/minecraft/' + minecraftUser.id + '/ban',
                method: 'POST',
                body: { reason: confirmBan },
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    modalCtx.open(data.message, "result");

                    props.refreshList();
                },
                onError: (error) => {
                    modalCtx.open(error, "error");

                },
            });
        }
    }

    const sendPromote = async (minecraftUser: MinecraftUserType) => {
        const confirmPromote = await modalCtx.open("Êtes-vous sûr de vouloir promouvoir " + minecraftUser.pseudo + " ?", "confirm");
        if (confirmPromote) {
            await sendRequest({
                key: 82,
                url: import.meta.env.VITE_PLAY_API_URL + '/users/' + minecraftUser.user.id + '/promote',
                method: 'POST',
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    modalCtx.open(data.message, "result");
                    props.refreshList();
                },
                onError: (error) => {
                    modalCtx.open(error, "error");
                },
            });
        }
    }

    const sendDemote = async (minecraftUser: MinecraftUserType) => {
        const confirmRetrograde = await modalCtx.open("Êtes-vous sûr de vouloir rétrograder " + minecraftUser.pseudo + " ?", "confirm");
        if (confirmRetrograde) {
            await sendRequest({
                key: 83,
                url: import.meta.env.VITE_PLAY_API_URL + '/users/' + minecraftUser.user.id + '/demote',
                method: 'POST',
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    modalCtx.open(data.message, "result");
                    props.refreshList();
                },
                onError: (error) => {
                    modalCtx.open(error, "error");
                },
            });
        }
    }

    return (
        <>
            <div className="w-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white overflow-x-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Liste des joueurs</h1>
                <p>Voici tous les joueurs que tu peux rencontrer sur le serveur ! Amusez-vous bien ! </p>
                <table className="rounded-lg w-full mt-4">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>
                            <th className="px-4 py-2 text-center">Rang</th>
                            {(authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN") && (
                                <>
                                    <th className="px-4 py-2 text-center">Garant</th>
                                    <th className="px-4 py-2 text-center">Accepté par</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </>
                            )}
                        </tr>
                        {props.userList[0] ?
                            <>
                                {props.userList.map((minecraftUser) => (
                                    <tr key={minecraftUser.id} className="border-b hover:bg-blue-100 transition-colors hover:text-black">
                                        <td className="px-4 py-2">{minecraftUser.pseudo}</td>
                                        <td className="px-4 py-2">{minecraftUser.user.username}</td>
                                        <td className="px-4 py-2">{minecraftUser.user.securityRank?.rolename}</td>
                                        {(authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN") && (
                                            <>
                                                <td className="px-4 py-2">{minecraftUser.garant?.pseudo}</td>
                                                <td className="px-4 py-2">{minecraftUser.verifyBy?.username}</td>
                                                <td className="justify-center px-4 py-2 gap-2 flex flex-col">
                                                    <button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => sendMinecraftBan(minecraftUser)}>Bannir</button><button className="b-2 border px-2 font-bold bg-sky-500 hover:scale-125 transition" onClick={() => sendPromote(minecraftUser)}>Promotion</button><button className="b-2 border px-2 font-bold bg-success-500 hover:scale-125 transition" onClick={() => sendDemote(minecraftUser)}>Rétrogadation</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        <p className="justify-center">Aucune personne autorisée...</p>
                                    </td>
                                </tr>
                            </>
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
}

export default AuthorizedUsersList;
