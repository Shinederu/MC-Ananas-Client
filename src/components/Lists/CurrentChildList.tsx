import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { UserType } from "@/types/User";
import { useContext } from "react";
type CurrentChildListProps = {
    userList: UserType[];
    refreshList: () => void;
}
const CurrentChildList = (props: CurrentChildListProps) => {


    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const cancel = (user: UserType) => {
        const confirmCanceled = confirm("Voulez-vous vraiment arrêter de vous porter garant pour " + user.minecraft?.pseudo + " ? Il perdra l'accès au serveur et devrat ré-effectuer une demande de garant.");
        if (confirmCanceled) {
            const sendCanceled = async () => {
                await sendRequest({
                    key: 4,
                    url: import.meta.env.VITE_PLAY_API_URL + '/users/minecraft/' + user.minecraft?.id + '/remove-child',
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
            sendCanceled();
        }
    }

    return (
        <>
            <div className="w-full bg-gradient-to-br from-yellow-300 to-red-500 p-6 rounded-2xl shadow-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-4">Vos enfants !</h1>
                <p>Voici toutes les personnes dont vous êtes le garant ! Suveillez les correctement ^^</p>
                <table className="rounded-lg w-full">
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
                            <th className="px-4 py-2 text-center">Autorisation fournie par</th>
                            <th className="px-4 py-2 text-center">Action(s)</th>
                            
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
                                        <td className="px-4 py-2">{user.minecraft?.verifyBy?.username}</td>
                                        <td className="flex justify-center px-4 py-2 gap-2">
                                            <button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => cancel(user)}>Retirer l'accès</button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        <p className="justify-center">Aucun ami invité.... quelle triste vie....</p>
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

export default CurrentChildList;
