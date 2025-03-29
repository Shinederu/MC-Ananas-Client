import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useInterval } from "@/shared/hooks/useInterval";
import { MinecraftUserType } from "@/types/User";
import { useContext, useState } from "react";

const ManageMinecraftAccountsList = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [accountsList, setAccountList] = useState<MinecraftUserType[]>([]);

    const sendGetMinecraftsAccountList = async () => {
        await sendRequest({
            key: 101,
            url: import.meta.env.VITE_PLAY_API_URL + '/management/minecraft',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setAccountList(data.minecrafts);
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    const sendDeleteMinecraftAccount = async (minecraftUser: MinecraftUserType) => {
        const confirmRemove = await modalCtx.open("Voulez-vous réellement supprimer le compte Minecraft " + minecraftUser.pseudo + " ?", "confirm");
        if (confirmRemove) {
            await sendRequest({
                key: 102,
                url: import.meta.env.VITE_PLAY_API_URL + '/management/minecraft/' + minecraftUser.id + "/delete",
                method: 'DELETE',
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    modalCtx.open(data.message, "result");
                },
                onError: (error) => {
                    modalCtx.open(error, "error");
                },
            });
        }
    }

    useInterval(() => {
        sendGetMinecraftsAccountList();
    }, 5000);

    return (
        <>
            <div className="w-full bg-gradient-to-br from-yellow-300 to-red-500 p-6 rounded-2xl shadow-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-4">Gestion des comptes Minecraft</h1>
                <p>Voici les comptes Minecraft actuellement liés</p>
                <table className="rounded-lg w-full mt-4">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>
                            <th className="px-4 py-2 text-center">Garant lié</th>
                            <th className="px-4 py-2 text-center">Action(s)</th>
                        </tr>
                        {accountsList[0] ?
                            <>
                                {accountsList.map((minecraftUser) => (
                                    <tr key={minecraftUser.id} className="border-b transition-colors">
                                        <td className="px-4 py-2">{minecraftUser.pseudo}</td>
                                        <td className="px-4 py-2">{minecraftUser.user.username}</td>
                                        <th className="px-4 py-2 text-center">{minecraftUser.garant?.pseudo}</th>
                                        <td className="flex justify-center px-4 py-2 gap-2">
                                            <button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => sendDeleteMinecraftAccount(minecraftUser)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        <p className="justify-center">Aucun compte Minecraft enregistré</p>
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
export default ManageMinecraftAccountsList;