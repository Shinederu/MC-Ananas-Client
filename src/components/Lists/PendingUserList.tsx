import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { UserType } from "@/types/User";
import { useContext } from "react";
type PendingUserListProps = {
    userList: UserType[];
    refreshList: () => void;
}
const PendingUserList = (props: PendingUserListProps) => {


    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const accepted = (user: UserType) => {
        const confirmAccepting = confirm("Êtes-vous sûr de vouloir vous portez garant de " + user.minecraft?.pseudo + "? En cas de problème de problème avec cette personne, vous pourriez subir des répercussions !");
        if (confirmAccepting) {
            const sendAccepted = async () => {
                await sendRequest({
                    key: 4,
                    url: import.meta.env.VITE_PLAY_API_URL + '/users/minecraft/' + user.minecraft?.id + '/garant-accepted',
                    method: 'POST',
                    headers: { Authorization: authCtx.token },
                    onSuccess: (data) => {
                        modalCtx.setMessage(data.message);
                        modalCtx.setType("confirm");
                        modalCtx.setIsOpen(true);
                        props.refreshList();
                    },
                    onError: (error) => {
                        modalCtx.setMessage(error);
                        modalCtx.setType("error");
                        modalCtx.setIsOpen(true);
                    },
                });
            };
            sendAccepted();
        }
    }

    const refused = (user: UserType) => {

        const confirmAccepting = confirm("Souhaitez-vous refuser de vous porter garant de " + user.minecraft?.pseudo + "?");
        if (confirmAccepting) {
            const sendRefused = async () => {
                await sendRequest({
                    key: 4,
                    url: import.meta.env.VITE_PLAY_API_URL + '/users/minecraft/' + user.minecraft?.id + '/garant-refused',
                    method: 'POST',
                    headers: { Authorization: authCtx.token },
                    onSuccess: (data) => {
                        modalCtx.setMessage(data.message);
                        modalCtx.setType("confirm");
                        modalCtx.setIsOpen(true);
                        props.refreshList();
                    },
                    onError: (error) => {
                        modalCtx.setMessage(error);
                        modalCtx.setType("error");
                        modalCtx.setIsOpen(true);
                    },
                });
            };
            sendRefused();
        }
    }


    return (
        <>
            <div className="bg-gradient-to-br from-blue-600 to-fuchsia-500 p-6 rounded-2xl shadow-lg text-white overflow-x-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Invitez vos amis !</h1>
                <p>Vous pouvez inviter d'autres joueurs de confiance a rejoindre le serveur et vous porter garant pour eux.</p>
                <p className="bg-red-800 m-2 border-white border-2 font-semibold p-2">En cliquant sur "<u>oui</u>" pour les utilisateurs ci-dessous, vous vous portez garant(e) et accepter le risque d'être sanctionné(e) si votre invité(e) porte préjudice au serveur ou à ces membres.</p>

                <table className="rounded-lg w-full overflow-x-auto">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>

                            {authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ?
                                <>
                                    <th className="px-4 py-2 text-center">Garant demandé</th>

                                </>
                                :
                                <>
                                </>
                            }
                            <th className="px-4 py-2 text-center">Accepter ?</th>
                        </tr>
                        {props.userList[0] ?
                            <>
                                {props.userList.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b transition-colors"
                                    >
                                        <td className="px-4 py-2">{user.minecraft?.pseudo}</td>
                                        <td className="px-4 py-2">{user.username}</td>
                                        {authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ?
                                            <>
                                                <th className="px-4 py-2 text-center">{user.minecraft?.garant?.pseudo}</th>
                                            </>
                                            :
                                            <>
                                            </>
                                        }
                                        <td className="flex justify-center px-4 py-2 gap-2">
                                            <button className="b-2 border px-2 font-bold bg-lime-600 hover:scale-125 transition" onClick={() => accepted(user)}>Oui</button>/<button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => refused(user)}>Non</button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        <p className="justify-center">Aucune demande en attente</p>
                                    </td>
                                </tr>
                            </>

                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PendingUserList;
