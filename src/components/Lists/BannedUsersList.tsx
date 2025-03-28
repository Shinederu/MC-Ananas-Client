import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { BanType, MinecraftUserType } from "@/types/User";
import { DateTimeFormatter } from "@/utils/DateTimeFormatter";
import { useContext } from "react";

type BannedUsersListProps = {
    banList: BanType[];
    refreshList: () => void;
}
const BannedUsersList = (props: BannedUsersListProps) => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const unban = (user: MinecraftUserType) => {
        const confirmBan = confirm("Êtes-vous sûr de vouloir débannir" + user.pseudo + "?");
        if (confirmBan) {
            const sendMinecraftUnban = async () => {
                await sendRequest({
                    key: 4,
                    url: import.meta.env.VITE_PLAY_API_URL + '/users/minecraft/' + user.id + '/unban',
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
            sendMinecraftUnban();
        }
    }

    return (
        <>
            <div className="w-full bg-gradient-to-br from-green-600 to-cyan-400 p-6 rounded-2xl shadow-lg text-white overflow-x-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Joueurs bannis</h1>
                <p>Certains utilisateurs n'ont pas été très appréciable sur le serveur et se sont retrouvé avec leurs comptes définitivement bannis. Il se peut que la personnes qui se soit également portée garante pour eux aie également subis une "pénalité" en fonction de la gravité des actes effectués.</p>
                <table className="rounded-lg w-full mt-4">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>
                            <th className="px-4 py-2 text-center">Raison</th>
                            <th className="px-4 py-2 text-center">Date/Heure</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                        {props.banList[0] ?
                            <>
                                {props.banList.map((ban) => (
                                    <tr
                                        key={ban.id}
                                        className="border-b transition-colors"
                                    >
                                        <td className="px-4 py-2">{ban.minecraft.pseudo}</td>
                                        <td className="px-4 py-2">{ban.minecraft.user.username}</td>
                                        <td className="px-4 py-2">{ban.reason}</td>
                                        <td className="px-4 py-2">{DateTimeFormatter(ban.createdAt)}</td>
                                        <td><button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => unban(ban.minecraft)}>Débannir</button></td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        <p className="justify-center">Aucune personne bannie...</p>
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

export default BannedUsersList;
